import gql from 'graphql-tag';
import { BookFragment } from './bookFragment';
import { AuthorFragment } from './authorFragment';

export const UpdateAuthor = gql`
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
