import dotenv from 'dotenv'
import users from './data/users.js'
import listings from './data/listings.js'
import User from './models/userModel.js'
import Listing from './models/listingModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
	try {
		await Listing.deleteMany()
		await User.deleteMany()

		const createdUsers = await User.insertMany(users)

		const seedUser = createdUsers[0].id

		const sampleListings = listings.map((listing) => {
			return { ...listing, user: seedUser }
		})

		await Listing.insertMany(sampleListings)

		console.log('data imported')
		process.exit()
	} catch (error) {
		console.log(`${error}`)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		await Listing.deleteMany()
		await User.deleteMany()

		console.log('data destroyed')
		process.exit()
	} catch (error) {
		console.log(`${error}`)
		process.exit(1)
	}
}

// check for -d flag in terminal command for destroyData
if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}

// to import data
// node server/seeds

// to destroy data
// node server/seeds -d

// also add script to package.json to make shortcuts available
// "data:import": "node server/seeds",
// "data:destroy": "node server/seeds -d"
