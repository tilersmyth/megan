import gql from 'graphql-tag';

export const SignupMutation = gql`
    mutation register($data: UserInput!) {
        register(data: $data){
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