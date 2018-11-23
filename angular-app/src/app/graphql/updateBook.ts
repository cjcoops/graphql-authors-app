import gql from 'graphql-tag';
import { BookFragment } from './bookFragment';

export const UpdateBook = gql`
  ${BookFragment}
  mutation updateBook($id: Int!, $book: BookInput!) {
    updateBook(id: $id, book: $book) {
      ...BookFragment
    }
  }
`;
