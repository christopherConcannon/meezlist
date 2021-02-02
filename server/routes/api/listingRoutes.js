import express from 'express'
const router = express.Router()

import { getListings } from '../../controllers/listingControllers.js'

router.route('/').get(getListings)

export default router