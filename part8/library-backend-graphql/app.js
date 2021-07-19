const { ApolloServer, gql, UserInputError } = require('apollo-server')
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
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      return books.length
    }
  },
  Query: {
    allBooks: async (root, args) => {
      let filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return [] // if author isn't found then clearly there's no books with their name
        }
        filter.author = author.id
      } 
      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: () => Author.find({}),
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments()
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      try {
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        const newBook = new Book({ ...args, author })
        return newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      const authorToEdit = await Author.findOne({ name: args.name })
      if (!authorToEdit) {
        return null
      }
      try {
        authorToEdit.born = args.setBornTo
        return authorToEdit.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
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