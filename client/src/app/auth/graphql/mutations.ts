import gql from 'graphql-tag';

export const SignupMutation = gql`
    mutation register($data: UserInput!) {
        register(data: $data){
            auth
            user{
                id
                firstName
                lastName
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
                firstName
                lastName
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
                firstName
                lastName
                email
                createdAt
            }
            token
        }
    }
`;

export const ForgotMutation = gql`
    mutation forgot($email: String!) {
        forgot(email: $email)
    }
`;

export const ResetMutation = gql`
    mutation reset($password: String!) {
        reset(password: $password)
    }
`;
