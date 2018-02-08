import gql from 'graphql-tag';

export const GetCurrentUser= gql`
     query GetCurrentUser {
        me{
            id
            first_name
            last_name
            email
            createdAt
        }
    }
`;