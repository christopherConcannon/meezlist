import listingResolvers from './listings.js'
import userResolvers from './users.js'

const resolvers = {
	Query   : {
		...listingResolvers.Query,
		...userResolvers.Query
	},
	Mutation : {
		...userResolvers.Mutation,
		...listingResolvers.Mutation
	},
	Listing : {
		...listingResolvers.Listing
	}
}

export default resolvers
