const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // Find the blog with the maximum likes
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes === maxLikes)

  // Return only the properties title, author, and likes of the favorite blog
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // Count the number of blogs for each author
  const authorCounts = _.countBy(blogs, 'author')

  // Find the author with the maximum number of blogs
  const maxBlogs = _.max(Object.values(authorCounts))
  const topAuthor = _.findKey(authorCounts, count => count === maxBlogs)

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
