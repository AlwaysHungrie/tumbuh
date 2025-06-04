import { Router, Request, Response } from 'express'
import {
  asyncHandler,
  uploadImage,
  validateRequest,
} from '../middleware/global'
import Joi from 'joi'
import prisma from '../prisma'

import { getWaterBalance, mintToAddress } from '../services/walletService'
import { getImageDescription } from '../services/openaiService'

interface WaterResponse {
  success: boolean
  reason: string
  amount: number
  txnHash: string | null
}

interface WaterCheckResult {
  isWatering: boolean
  reasoning: string
}

const waterRouter = Router()

waterRouter.get(
  '/:address',
  asyncHandler(async (req: Request, res: Response) => {
    const { address } = req.params
    const waterBalance = await getWaterBalance(address)
    res.json({ success: true, waterBalance })
  })
)

waterRouter.post(
  '/',
  uploadImage,
  validateRequest(
    Joi.object({
      address: Joi.string().required(),
    })
  ),
  asyncHandler(async (req: Request, res: Response) => {
    const { address } = req.body
    const { file } = req

    if (!file) {
      const response: WaterResponse = {
        success: false,
        reason: 'No image file uploaded',
        amount: 0,
        txnHash: null,
      }
      return res.status(400).json(response)
    }

    const metadata = await prisma.tumbuhMetadata.findFirst()
    if (!metadata?.isAcceptingWater) {
      const response: WaterResponse = {
        success: false,
        reason: 'Not allowed',
        amount: 0,
        txnHash: null,
      }
      return res.status(200).json(response)
    }

    const waterCheckResult = await getImageDescription(file.path, file.mimetype)
    if (!waterCheckResult?.tool_calls?.[0]?.function?.arguments) {
      const response: WaterResponse = {
        success: false,
        reason: 'No result from OpenAI',
        amount: 0,
        txnHash: null,
      }
      return res.status(200).json(response)
    }

    const toolCall = waterCheckResult.tool_calls[0]
    const { isWatering, reasoning }: WaterCheckResult = JSON.parse(toolCall.function.arguments)

    let txnHash: string | null = null
    if (isWatering) {
      try {
        txnHash = await mintToAddress(address, '1')
      } catch (error) {
        console.error('Water minting failed:', error)
        const response: WaterResponse = {
          success: false,
          reason: `Water failed: ${(error as Error).message}`,
          amount: 0,
          txnHash: null,
        }
        return res.status(200).json(response)
      }
    }

    const response: WaterResponse = {
      success: isWatering,
      reason: reasoning,
      amount: isWatering ? 1 : 0,
      txnHash,
    }
    res.status(200).json(response)
  })
)

export default waterRouter
