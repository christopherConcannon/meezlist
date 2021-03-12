import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    getListings: [Listing!]!
    getListing(listingId: ID!): Listing
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
  }
  
  
  type Listing {
    _id: ID!
    # user: ID!
    user: User!
    title: String!
    description: String!
    images: [String]!
    brand: String!
    category: String!
    location: String!
    price: Float!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    token: String!
    createdAt: String!
    updatedAt: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }
`

export default typeDefs