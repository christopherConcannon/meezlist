import { AuthenticationError } from 'apollo-server-express'

import Listing from '../../models/Listing.js'
import User from '../../models/User.js'

const listingResolvers = {
	Query    : {
		getListings : async () => {
			try {
				const listings = await Listing.find()
				return listings
			} catch (error) {
				throw new Error(error)
			}
		},
		getListing  : async (_, { listingId }) => {
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
	},
	Mutation : {
		createListing : async (_, { createListingInput }, context) => {
			const { title, description, brand, category } = createListingInput
			try {
				const listing = new Listing({
					user        : '6019caed6e9c1f7bb4a53cf5',
					title       : title || 'Sample title',
					description : description || 'Sample description',
					images      : [ '/images/listing1_1.jpg' ],
					brand       : brand || 'Sample brand',
					category    : category || 'Sample category', 
          location: 'sample location'
				})

				const createdListing = await listing.save()
				return createdListing
			} catch (err) {
				throw new Error(err)
			}
		}
	},
	Listing  : {
		user : async (parent, args, context, info) => {
			try {
				const userId = parent.user
				const user = await User.findOne({ _id: userId })

				return {
					...user._doc,
					password : null
				}
			} catch (err) {
				throw new Error(err)
			}
		}
	}
}

export default listingResolvers
