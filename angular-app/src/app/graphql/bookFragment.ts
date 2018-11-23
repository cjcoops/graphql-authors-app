import gql from 'graphql-tag';

export const BookFragment = gql`
  fragment BookFragment on Book {
    id
    title
    publisher
    edition
    authorId
  }
`;
