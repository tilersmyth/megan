import gql from 'graphql-tag';

export const SignupMutation = gql`
    mutation register($data: UserInput!) {
        register(data: $data){
            auth
            user{
                id
                first_name
                last_name
                email
                createdAt
            }
            token
        }
    }
`;

export const LoginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            auth
            user{
                id
                first_name
                last_name
                email
                createdAt
            }
            token
        }
    }
`;

export const ConfirmMutation = gql`
    mutation confirm($token: String!) {
        confirm(token: $token){
            auth
            user{
                id
                first_name
                last_name
                email
                createdAt
            }
            token
        }
    }
`;