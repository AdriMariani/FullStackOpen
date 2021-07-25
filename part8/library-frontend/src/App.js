
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import ErrorMessage from './components/ErrorMessage'
import { useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'
import EditAuthor from './components/EditAuthor'

const App = () => {
  const [page, setPage] = useState('authors')
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storageToken = localStorage.getItem('library-user-token', token)
    if (storageToken) {
      setToken(storageToken)
    }
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ?
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => logout()}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <ErrorMessage errorMessage={error} />

      <Authors
        show={page === 'authors'}
      />
      <EditAuthor
        show={page === 'authors' && token}
        setError={setError}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={setError}
      />

      <LoginForm 
        show={page === 'login'}
        setError={setError}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App