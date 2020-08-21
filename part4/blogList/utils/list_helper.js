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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}