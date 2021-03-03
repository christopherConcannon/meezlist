const listingsResolvers = require('./listings')
const usersResolvers = require('./users')

module.exports = {
	Query    : {
		...listingsResolvers.Query
	},
	Mutation : {
		...usersResolvers.Mutation,
		...listingsResolvers.Mutation
	}
}
