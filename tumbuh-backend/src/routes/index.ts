import { Router } from 'express'
import priceRouter from './price'
import waterRouter from './water'

const router = Router()

router.use('/price', priceRouter)
router.use('/water', waterRouter)

export default router
