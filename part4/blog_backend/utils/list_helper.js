const dummy = blogArr => {
  return 1
}

const totalLikes = blogArr => {
  return blogArr.reduce((total, current) => total + current.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}