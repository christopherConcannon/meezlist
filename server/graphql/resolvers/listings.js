import { AuthenticationError } from 'apollo-server-express'

import Listing from '../../models/Listing.js'

const listingsResolvers = {
	Query : {
		async getListings() {
      console.log('getListings resolver')
			try {
				const listings = await Listing.find()
				return listings
			} catch (error) {
				throw new Error(error)
			}
		}
	}
}

export default listingsResolvers
