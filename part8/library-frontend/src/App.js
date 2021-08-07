import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import { useApolloClient, useSubscription } from '@apollo/client'
import LoginForm from './components/LoginForm'
import EditAuthor from './components/EditAuthor'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storageToken = localStorage.getItem('library-user-token', token)
    if (storageToken) {
      setToken(storageToken)
    }
  }, [token])

  const updateBookCache = (newBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, newBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(newBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      notify(`${newBook.title} was just added`, false)
      updateBookCache(newBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
    setPage('login')
  }

  const notify = (message, isError) => {
    setNotification({ message, isError })
    setTimeout(() => setNotification(null), 5000)
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
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={() => logout()}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Notification
        notification={notification}
      />

      <Authors
        show={page === 'authors'}
      />
      <EditAuthor
        show={page === 'authors' && token}
        notify={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        notify={notify}
        setPage={setPage}
      />

      <Recommend 
        show={page === 'recommend'}
      />

      <LoginForm 
        show={page === 'login'}
        notify={notify}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App