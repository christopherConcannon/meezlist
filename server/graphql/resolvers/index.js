import listingsResolvers from './listings.js'
// import usersResolvers from './users.js'

const resolvers = {
	Query    : {
		...listingsResolvers.Query
	},
	// Mutation : {
	// 	// ...usersResolvers.Mutation,
	// 	// ...listingsResolvers.Mutation
	// }
}

export default resolvers
