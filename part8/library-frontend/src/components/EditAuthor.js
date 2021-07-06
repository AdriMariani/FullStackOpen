import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { EDIT_AUTHOR } from '../queries'

const EditAuthor = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()

    editAuthor({
      variables: { author, born: Number(born) }
    })

    setAuthor('')
    setBorn('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update</button>
      </form>
    </div>
  )
}

export default EditAuthor