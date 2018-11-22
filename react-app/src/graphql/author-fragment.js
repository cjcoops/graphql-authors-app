import gql from 'graphql-tag';

export default gql`
fragment AuthorFragment on Author {
    id
    firstName
    lastName
}
`;
