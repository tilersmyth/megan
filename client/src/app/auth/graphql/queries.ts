import gql from 'graphql-tag';

export const GetCurrentUser = gql`
     query GetCurrentUser {
        me{
            id
            firstName
            lastName
            email
            createdAt
        }
    }
`;
