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
query {
  allBooks {
    id
    title
    published
    author {
      name,
      born
    }
    genres
  }
}
`