import gql from 'graphql-tag';
import BookFragment from './book-fragment.js';
import AuthorFragment from './author-fragment.js';

export default gql`
${BookFragment}
${AuthorFragment}
query books($title: String, $authorId: Int) {
    books(title: $title, authorId: $authorId) {
        ...BookFragment
        authorId
        author {
            ...AuthorFragment
        }
    }
}
`;