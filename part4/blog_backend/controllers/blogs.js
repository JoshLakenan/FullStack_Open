const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end();
})

blogsRouter.post('/', async (request, response) => {
  const requestBlog = request.body

  const blog = new Blog(requestBlog)

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const requestBlog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, requestBlog, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog)
})

module.exports = blogsRouter