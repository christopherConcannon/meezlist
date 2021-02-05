import express from 'express'
const router = express.Router()

import { getListings, getListingById } from '../../controllers/listingControllers.js'

router.route('/').get(getListings)
router.route('/:id').get(getListingById)

export default router