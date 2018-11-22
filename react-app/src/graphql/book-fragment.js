import gql from 'graphql-tag';

export default gql`
fragment BookFragment on Book {
    id
    title
    publisher
    edition
}
`;
