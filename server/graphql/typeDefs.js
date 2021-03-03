import { gql } from 'apollo-server-express'
// const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    getListings: [Listing!]!
    getListing(listingId: ID!): Listing
  }

  type Mutation {

  }
  
  
  type Listing {
    id: ID!
    user: User!
    title: String!
    description: String!
    images: [String]!
    brand: String!
    category: String!
    location: String!
    price: Number!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    # createdAt: Date!  ???
    updatedAt: String!
  }
`

export default typeDefs