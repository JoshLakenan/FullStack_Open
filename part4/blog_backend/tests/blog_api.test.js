const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { after } = require('node:test')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)
})


test('GET - Blog content is received as JSON', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('GET - Correct number of blogs is received', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length);
})


test('Unique ID property is named `id`', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs[0].id).toBeDefined();
})
describe('POST - When creating a new blog', () => {
  test('a new blog can be created successfully', async () => {
    const newBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogs = await helper.blogsInDb()

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
  })

  test('a missing likes property should default to the value 0', async () => {
    const newBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/"
    }

    const response = await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toEqual(0)
  })

  test('a missing Title or URL results in a 400 status code', async () => {
    const newBlog1 = {
      title: "React patterns",
      author: "Michael Chan",
      likes: 100
    }
    const newBlog2 = {
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 100
    }
    const newBlog3 = {
      author: "Michael Chan",
      likes: 100
    }

    await api.post('/api/blogs')
      .send(newBlog1)
      .expect(400)

    await api.post('/api/blogs')
      .send(newBlog2)
      .expect(400)

    await api.post('/api/blogs')
      .send(newBlog3)
      .expect(400)
  })
})

describe('DELETE - When deleting a blog', () => {
  test('a 204 status code is received', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlogID = blogs[0].id

    await api.delete(`/api/blogs/${firstBlogID}`)
      .expect(204)

    })

  test('the length of blogs is reduced by 1', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlogID = blogs[0].id

    await api.delete(`/api/blogs/${firstBlogID}`)

    const postDeleteBlogs = await helper.blogsInDb()

    expect(postDeleteBlogs).toHaveLength(helper.initialBlogs.length - 1)
  })

})

describe('PUT - When updating a blog', () => {
  test('a 200 status code is received', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlog = blogs[0]

    firstBlog.likes = 1000;

    await api.put(`/api/blogs/${firstBlog.id}`)
      .send(firstBlog)
      .expect(200)
  })

  test('The blog likes can be updated', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlog = blogs[0]

    firstBlog.likes = 1000;

    const response = await api.put(`/api/blogs/${firstBlog.id}`)
      .send(firstBlog)

    expect(response.body.likes).toEqual(1000)
  })

  test('The number of total blogs is the same', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlog = blogs[0]

    firstBlog.likes = 1000;

    await api.put(`/api/blogs/${firstBlog.id}`)

    const afterUpdateBlogs = await helper.blogsInDb()

    expect(blogs).toHaveLength(afterUpdateBlogs.length)
  })

  xtest('invalid updates result in a 400 response', async () => {
    const blogs = await helper.blogsInDb()

    const blog1 = blogs[0]
    const blog2 = blogs[1]
    const blog3 = blogs[2]

    delete blog1.url
    delete blog2.title
    delete blog3.title
    delete blog3.url


    await api.put(`/api/blogs/${blog1.id}`)
      .send(blog1)
      .expect(400)

    await api.put(`/api/blogs/${blog2.id}`)
      .send(blog2)
      .expect(400)

    await api.put(`/api/blogs/${blog3.id}`)
      .send(blog3)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})