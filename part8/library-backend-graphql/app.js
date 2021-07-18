const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
require('dotenv').config()

const MONGO_DB_URI = process.env.MONGO_DB_URI

mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int,
    bookCount: Int!
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!,
    bookCount: Int!,
    authorCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Book: {
    author: (root) => {
      // assuming that author names are unique here
      return authors.find(author => author.name === root.author)
    }
  },
  Author: {
    bookCount: (root) => {
      return books.filter(book => book.author === root.name).length
    }
  },
  Query: {
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      }
      return books.filter(book => {
        if (!args.genre) {
          return book.author === args.author
        } else if (!args.author) {
          return book.genres.includes(args.genre)
        } else {
          return book.author === args.author && book.genres.includes(args.genre)
        }
      })
    },
    allAuthors: () => Author.find({}),
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments()
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const newBook = new Book({ ...args, author })
      return newBook.save()
    },
    editAuthor: (root, args) => {
      const authorToEdit = authors.find(author => author.name === args.name)
      if (!authorToEdit) {
        return null
      }
      const editedAuthor = { ...authorToEdit, born: args.setBornTo }
      authors = authors.map(author => author.name === args.name ? editedAuthor : author)
      return editedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})