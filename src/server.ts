import express from 'express'
import { IndexRouter } from './controllers/v0/index.router'
import bodyParser from 'body-parser'

(async () => {
  const app = express()
  const port = process.env.PORT || 8222

  app.use(bodyParser.json())
  app.use('/api/v0/', IndexRouter)

  // Root URI call
  app.get( '/', async ( req, res ) => {
    res.send( '/api/v0/' )
  })

  // Start the Server
  app.listen( port, () => {
    console.log( `Server running on http://localhost:8222` )
    console.log( `Press CTRL+C to stop server` )
  })
})()
