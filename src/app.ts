import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import { globalErrorHandler } from './app/error/globalErrorHandler'
import { notFoundRoute } from './app/error/notFoundRoute'

// Create Express app
const app: Application = express()

// Parser
app.use(express.json())
app.use(
  cors({
    origin: ['https://recipe-rakib03.web.app', 'http://localhost:5173'],
    credentials: true,
  }),
)

// Create handler for GET request /
const getRootController = (req: Request, res: Response) => {
  // Send response text
  res.send('Hello Express JS!')
}

// Use the router
app.use(router)

// Route handler for /
app.get('/', getRootController)

// Error Handler
app.use(globalErrorHandler)

// Not found route
app.use(notFoundRoute)

export default app
