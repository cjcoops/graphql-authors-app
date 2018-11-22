const { ApolloServer, makeExecutableSchema, gql } = require('apollo-server');
const data = require('./faker');

const typeDefs = gql`
type Author {
    id: Int!
    firstName: String
    lastName: String
    dateOfBirth: String
    books: [Book]
}

type Book {
    id: Int!
    title: String
    publisher: String
    edition: String
    authorId: Int
    author: Author
}


type Query {
    authors(firstName: String, lastName: String): [Author]
    author(id: Int!): Author
    books(title: String, authorId: Int): [Book]
    book(id: Int!): Book
}

input BookInput {
    title: String!
    publisher: String
    edition: String
    authorId: Int
}

input AuthorInput {
    firstName: String!
    lastName: String!
    dateOfBirth: String
}

type Mutation {
    addBook(book: BookInput!): Book
    updateBook(id: Int!, book: BookInput!): Book
    deleteBook(id: Int!): Book
    addAuthor(author: AuthorInput!): Author
    updateAuthor(id: Int!, author: AuthorInput!): Author
    deleteAuthor(id: Int!): Author
}

`;

const findById = (items, id) => items.find(item => item.id === id);

const resolvers = {
    Query: {
        authors: (_, args) => {
            let authors = data.authors;
            if ('firstName' in args) {
                authors = authors.filter(author => author.firstName === args.firstName);
            }
            if ('lastName' in args) {
                authors = authors.filter(author => author.lastName === args.lastName)
            }
            return authors;
        },
        author: (_, { id }) => findById(data.authors, id),
        books:(_, args) => {
            let books = data.books;
            if ('title' in args) {
                books = books.filter(author => book.title === args.title);
            }
            if ('authorId' in args) {
                books = books.filter(book => book.authorId === args.authorId)
            }
            return books;
        },
        book: (_, { id }) => findById(data.books, id),
    },
    Mutation: {
        addBook: (_, { book }) => {
            const author = findById(data.authors, book.authorId);
            if (!author) {
                throw Error(`Author (${book.authorId}) does not exist`)
            }
            data.books.push(book);
            return book;
        },
        updateBook: (_, { id, book}) => {
            const index = data.books.findIndex(item => item.id === id);
            if (index === null) {
                throw Error(`Book (${id}) does not exist`)
            }
            const updateBook = data.books[index];

            book = {
                ...updateBook,
                ...book,
            };
            data.books[index] = book;
            return book;
        },
        deleteBook: (_, { id }) => {
            const index = data.books.findIndex(item => item.id === id);
            if (index === null) {
                throw Error(`Book (${id}) does not exist`)
            }
            return data.books.splice(index, 1);
        },
        addAuthor: (_, { author }) => {
            data.authors.push(author);
            return author;
        },
        updateAuthor: (_, { id, author }) => {
            const index = data.authors.findIndex(item => item.id === id);
            if (index === null) {
                throw Error(`Author (${id}) does not exist`)
            }
            const updateAuthor = data.authors[index];

            author = {
                ...updateAuthor,
                ...author,
            };
            data.authors[index] = author;
            return author;
        },
        deleteAuthor: (_, { id }) => {
            const index = data.authors.findIndex(item => item.id === id);
            if (index === null) {
                throw Error(`Author (${id}) does not exist`)
            }
            return data.authors.splice(index, 1);
        }
    },
    Author: {
        books: (author) => data.books.filter(book => book.authorId === author.id)
    },
    Book: {
        author: (book) => data.authors.find(author => author.id === book.authorId)
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});