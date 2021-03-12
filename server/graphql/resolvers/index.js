import listingResolvers from './listings.js'
// import usersResolvers from './users.js'

const resolvers = {
	Query   : {
		...listingResolvers.Query
	},
	// Mutation : {
	// 	// ...usersResolvers.Mutation,
	// 	// ...listingResolvers.Mutation
	// },
	Listing : {
		...listingResolvers.Listing
	}
}

export default resolvers
