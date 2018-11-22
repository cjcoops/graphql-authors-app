import gql from 'graphql-tag';
import BookFragment from './book-fragment.js';
import AuthorFragment from './author-fragment.js';

export default gql`
${BookFragment}
${AuthorFragment}
query authors($firstName: String, $lastName: String) {
    authors(firstName: $firstName, lastName: $lastName) {
        ...AuthorFragment
        books {
            ...BookFragment
        }
    }
}
`;