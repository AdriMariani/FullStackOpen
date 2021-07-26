import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('all genres')
  const [genres, setGenres] = useState(['all genres'])

  useEffect(() => {
    if (!result.loading) {
      setBooks(result.data.allBooks)
      const genresList = [].concat(genres)
      result.data.allBooks.forEach(book => {
        book.genres.forEach(genre => {
          if (!genresList.includes(genre)) {
            genresList.push(genre)
          }
        })
      })
      setGenres(genresList)
    }
  }, [result]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      {
        genre !== 'all genres' ? <p>in genre: <strong>{genre}</strong></p> : null
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            genre === 'all genres' ?
            books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ) :
            books.map(a => {
              if (a.genres.includes(genre)) {
                return (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                )
              }
              return null
            })  
          }
        </tbody>
      </table>
      <div>
        {
          genres.map(genre => (
            <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
          ))
        }
      </div>
    </div>
  )
}

export default Books