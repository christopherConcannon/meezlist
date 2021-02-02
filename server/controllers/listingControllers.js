import asyncHandler from 'express-async-handler'
import { Listing } from '../models/index.js'

// @desc    Fetch all listings
// @route   GET /api/listings
// @access  Public
const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({})

  res.json(listings)
})

export {
  getListings
}