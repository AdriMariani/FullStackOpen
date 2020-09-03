import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('event handler receives correct input after submit', () => {
  const blog = {
    title: 'for test',
    author: 'somebody',
    url: 'http://www.someblog.ca'
  }

  const createBlogMock = jest.fn()
  const component = render(<BlogForm createBlog={createBlogMock}/>)

  const form = component.container.querySelector('form')
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(titleInput, {
    target: { value: blog.title }
  })
  fireEvent.change(authorInput, {
    target: { value: blog.author }
  })
  fireEvent.change(urlInput, {
    target: { value: blog.url }
  })
  fireEvent.submit(form)

  expect(createBlogMock.mock.calls).toHaveLength(1)
  expect(createBlogMock.mock.calls[0][0]).toEqual(blog)
})