import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { checkAuth } from '../../middleware/authMiddleware.js'
import { validateListingInput } from '../../utils/validators.js'

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
      // authorize user - check logged in
      const user = await checkAuth(context)
      
      // validate inputs
			const { title, description, brand, category } = createListingInput
      const { valid, errors } = validateListingInput(title, description)
      if (!valid) {
				throw new UserInputError('Errors', { errors })
			}

			try {
				const listing = new Listing({
					user        : user._id,
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
