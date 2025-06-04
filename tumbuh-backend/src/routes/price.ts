import { Router, Request, Response } from 'express'
import prisma from '../prisma'
import {
  asyncHandler,
  validateRequest,
  verifyApiSecret,
} from '../middleware/global'
import Joi from 'joi'

const priceRouter = Router()

priceRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const metadata = await prisma.tumbuhMetadata.findFirst()
    res.json({
      success: true,
      price: metadata?.currentPrice,
      isAcceptingWater: metadata?.isAcceptingWater,
    })
  })
)

priceRouter.post(
  '/',
  verifyApiSecret,
  validateRequest(
    Joi.object({
      price: Joi.number().optional(),
      isAcceptingWater: Joi.boolean().optional(),
    })
  ),
  asyncHandler(async (req: Request, res: Response) => {
    const updateData: { currentPrice?: number; isAcceptingWater?: boolean } = {}
    
    if (req.body.price !== undefined) {
      updateData.currentPrice = req.body.price
    }
    if (req.body.isAcceptingWater !== undefined) {
      updateData.isAcceptingWater = req.body.isAcceptingWater
    }

    const foundPrice = await prisma.tumbuhMetadata.findFirst()
    if (!foundPrice) {
      await prisma.tumbuhMetadata.create({
        data: updateData,
      })
    } else {
      await prisma.tumbuhMetadata.update({
        where: { id: foundPrice.id },
        data: updateData,
      })
    }
    res.json({ success: true, ...updateData })
  })
)

export default priceRouter