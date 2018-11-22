import gql from 'graphql-tag';
import BookFragment from './book-fragment.js';
import AuthorFragment from './author-fragment.js';

export default gql`
${BookFragment}
${AuthorFragment}
query book(id: Int!) {
    book(id: $id) {
        ...BookFragment
        authorId
        author {
            ...AuthorFragment
        }
    }
}
`;