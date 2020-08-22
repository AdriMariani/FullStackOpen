const dummy = blogs => 1

const totalLikes = (blogs) => {
  return blogs.reduce( (sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.length === 0 
    ? null 
    : blogs.reduce( (fav, blog) => {
        return blog.likes > fav.likes ? blog : fav
      })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors = blogs.reduce( (acc, blog) => {
    const author = blog.author
    acc[author] ? acc[author].blogs += 1 : acc[author] = {author, blogs: 1}
    return acc
  }, {})

  return Object.values(authors).reduce( (max, author) => {
    return max.blogs > author.blogs ? max : author
  })
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors = blogs.reduce( (acc, blog) => {
    const author = blog.author
    const likes = blog.likes
    acc[author] ? acc[author].likes += likes : acc[author] = {author, likes}
    return acc
  }, {})

  return Object.values(authors).reduce( (max, author) => {
    return max.likes > author.likes ? max : author
  })
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}