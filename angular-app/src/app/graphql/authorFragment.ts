import gql from 'graphql-tag';

export const AuthorFragment = gql`
  fragment AuthorFragment on Author {
    id
    firstName
    lastName
  }
`;
