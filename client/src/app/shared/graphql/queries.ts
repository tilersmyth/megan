import gql from 'graphql-tag';

export const GetCurrentUser= gql`
     query GetCurrentUser {
        me{
            _id
            email
            createdAt
        }
    }
`;