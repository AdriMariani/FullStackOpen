import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    id
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS =gql`
query allBooks($genre: String, $author: String) {
  allBooks(genre: $genre, author: $author) {
    id
    title
    published
    author {
      name
      born
      bookCount
    }
    genres
  }
}
`

export const ADD_BOOK = gql`
mutation newBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author {
      name
      born
      bookCount
    }
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation changeYear($author: String!, $born: Int!) {
  editAuthor(name: $author, setBornTo: $born) {
    id
    name
    born
    bookCount
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`

export const ME = gql`
query {
  me {
    username
    favouriteGenre
  }
}
`