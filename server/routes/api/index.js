import express from 'express'
import listingRoutes from './listingRoutes.js'
import userRoutes from './userRoutes.js'

const router = express.Router()

router.use('/listings', listingRoutes)
router.use('/users', userRoutes)

export default router