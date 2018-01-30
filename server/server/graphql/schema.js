export default `
  type User {
    _id: String!
    email: String!
    createdAt: String!
  }
  type Query {
    allUsers: [User!]!
    me: User
  }
  type Mutation {
    register(email: String!, password: String!): String!
    login(email: String!, password: String!): String!
  }
`;