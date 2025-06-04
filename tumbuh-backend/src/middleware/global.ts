import { NextFunction, Request, Response } from 'express'
import { config } from '../config'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error) {
      res.status(400).json({ error: error.message })
      return
    }
    next()
  }
}

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Default error values
  const statusCode = err?.statusCode || 500
  const message = err?.message || 'Something went wrong'

  // Log errors in development and production
  console.error(`${req?.method} ${req?.path} - ${err?.message}`, {
    stack: err?.stack,
    statusCode,
  })

  // Prepare response based on error type
  const response: any = {
    success: false,
    message,
  }

  // Add validation errors if present
  if (err?.errors) {
    response.errors = err?.errors
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err?.stack
  }

  res.status(statusCode).json(response)
}

export const verifyApiSecret = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Missing authorization token' })
    return
  }

  try {
    if (token !== config.apiSecret) {
      res.status(401).json({ message: 'Invalid authorization token' })
      return
    }
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads')
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir)
    }
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    )
  },
})

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Error: Images only!'))
    }
  },
})

export const uploadImage = upload.single('imageFile')
