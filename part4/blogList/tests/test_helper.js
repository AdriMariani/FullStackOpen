const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Masai Ujiri issues a powerful statement about bodycam footage from racist Oakland cop",
    author: "Lauren O'Neil",
    url: "https://www.blogto.com/city/2020/08/masai-ujiri-powerful-statement-racist-oakland-cop/",
    likes: 0
  },
  {
      title:"test",
      author:"test test",
      url: "https://www.exampleURL.com",
      likes: 20
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: "delete",
    url: "tobedeleted.com"
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId
}

