import gql from 'graphql-tag';
import BookFragment from './book-fragment.js';
import AuthorFragment from './author-fragment.js';

export default gql`
${BookFragment}
${AuthorFragment}
query author(id: Int!) {
    author(id: $id) {
        ...AuthorFragment
        books {
            ...BookFragment
        }
    }
}
`;