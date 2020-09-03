import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
  title: 'test blog',
  author: 'some author',
  url: 'http://www.ablogsite.com',
  likes: 11,
  user: {
    username: 'testUser',
    name: 'test',
    id: '507f1f77bcf86cd799439011'
  }
}

test('renders title and author but not url or likes', () => {
  const component = render(<Blog
    blog={blog}
    likeBlog={() => 'like'}
    deleteBlog={() => 'delete'}
    showDelete={false}
  />)

  expect(component.container.querySelector('.titleAndAuthor')).toHaveTextContent(
    `${blog.title} by ${blog.author}`
  )
  expect(component.container.querySelector('.likes')).toBe(null)
  expect(component.container.querySelector('.url')).toBe(null)
})

test('clicking view button will show all blog data', () => {
  const component = render(<Blog
    blog={blog}
    likeBlog={() => 'like'}
    deleteBlog={() => 'delete'}
    showDelete={false}
  />)

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  expect(component.container.querySelector('.titleAndAuthor')).toHaveTextContent(
    `${blog.title} by ${blog.author}`
  )
  expect(component.container.querySelector('.likes')).toHaveTextContent(
    `${blog.likes}`
  )
  expect(component.container.querySelector('.url')).toHaveTextContent(
    `${blog.url}`
  )
})