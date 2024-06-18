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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
