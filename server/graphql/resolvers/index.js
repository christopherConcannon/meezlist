import listingsResolvers from './listings.js'
// import usersResolvers from './users.js'

const resolvers = {
	Query    : {
		...listingsResolvers.Query
	},
	// Mutation : {
	// 	// ...usersResolvers.Mutation,
	// 	// ...listingsResolvers.Mutation
	// },
  Listing: {
    ...listingsResolvers.Listing
  }
}

export default resolvers
