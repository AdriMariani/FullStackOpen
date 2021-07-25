import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: error => props.setError(error.graphQLErrors[0].message)
  })
  const results = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (!results.loading) {
      setAuthor(results.data.allAuthors[0].name)
    }
  }, [results])

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    if (!born) {
      props.setError('Please select a year before submitting')
    }

    editAuthor({
      variables: { author, born: Number(born) }
    })

    setAuthor(results.data.allAuthors[0].name)
    setBorn('')
  }

  if (results.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          author
          <select onChange={(event) => setAuthor(event.target.value)}>
            { 
              results.data.allAuthors.map((author, index) => (
                <option key={author.id} value={author.name}>{author.name}</option>
              ))
            }
          </select>
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