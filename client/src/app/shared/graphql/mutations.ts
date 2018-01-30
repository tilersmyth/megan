import gql from 'graphql-tag';

export const SignupMutation = gql`
    mutation register($email: String!, $password: String!) {
        register(email: $email, password: $password)
    }
`;

export const LoginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;