import gql from 'graphql-tag';
import BookFragment from './book-fragment.js';
import AuthorFragment from './author-fragment.js';

export default gql`
${BookFragment}
${AuthorFragment}
mutation updateAuthor($id: Int!, $author: AuthorInput!) {
    updateAuthor(id: $id, author: $author) {
        ...AuthorFragment
        books {
            ...BookFragment
        }
    }
}
`;