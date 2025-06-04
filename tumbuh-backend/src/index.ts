import express from 'express'
import { config } from './config'
import cors from 'cors'
import router from './routes'
import { globalErrorHandler } from './middleware/global'
const app = express()
app.use(express.json())
app.use(
  cors({
    origin: config.frontendHost,
  })
)

app.get('/status', (req, res) => {
  res.json({
    status: 'ok',
  })
})

app.use('/api', router)

app.use(globalErrorHandler)

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
})
