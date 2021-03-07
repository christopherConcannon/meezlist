import { AuthenticationError } from 'apollo-server-express'

import Listing from '../../models/Listing.js'

const listingsResolvers = {
	Query : {
		async getListings() {
			try {
				const listings = await Listing.find()
				return listings
			} catch (error) {
				throw new Error(error)
			}
		},
    async getListing(_, { listingId }) {
			try {
				const listing = await Listing.findById(listingId)
				if (listing) {
					return listing
				} else {
					throw new Error('listing not found')
				}
			} catch (err) {
				throw new Error(err)
			}
		}
  }
}

export default listingsResolvers
