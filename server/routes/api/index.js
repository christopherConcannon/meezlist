import express from 'express'
import listingRoutes from './listingRoutes.js'

const router = express.Router()

router.use('/listings', listingRoutes)

export default router