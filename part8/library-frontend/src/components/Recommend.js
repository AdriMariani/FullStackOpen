import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
    const [getFavouriteBooks, favouriteBooks] = useLazyQuery(ALL_BOOKS)
    const [getUser, user] = useLazyQuery(ME)

    useEffect(() => {
      if (props.show) {
        getUser()
      }
    }, [props.show, getUser])

    useEffect(() => {
      if (user.data) {
        getFavouriteBooks({
          variables: {
            genre: user.data.me.favouriteGenre
          }
        })
      }
    }, [user.data, getFavouriteBooks])

    if (!props.show) {
      return null
    }

    if (props.show && (!user.data || !favouriteBooks.data)) {
      return <div>loading...</div>
    }

    return (
      <div>
        <h2>recommendations</h2>
        <p>books in your favourite genre <strong>{user.data.me.favouriteGenre}:</strong></p>
        {
          favouriteBooks.data.allBooks.length > 0 ?
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
                favouriteBooks.data.allBooks.map(a =>
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                )
              }
            </tbody>
          </table> :
          <p>Unfortunately, there are no books in your favourite genre</p>
        }
      </div>
    )
}

export default Recommend