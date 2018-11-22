import gql from 'graphql-tag';
import BookFragment from './book-fragment.js';
import AuthorFragment from './author-fragment.js';

export default gql`
${BookFragment}
${AuthorFragment}
mutation updateBook($id: Int!, $book: BookInput!) {
    updateBook(id: $id, book: $book) {
        ...BookFragment
        authorId
        author {
            ...AuthorFragment
        }
    }
}
`;