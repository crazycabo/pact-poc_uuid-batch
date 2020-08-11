import { Router, Request, Response } from 'express'
import { UUIDItem } from '../models/UUIDItem'
import * as request from 'superagent'
import { createLogger } from '../../../../utils/logger'

const logger = createLogger('uuid')
const router: Router = Router()

// Get a random UUID from the producing API and verify it
router.get('/', async (req: Request, res: Response) => {
  logger.info(`Get new validated UUID`)

  const validatedUuid = await request.get(`http://localhost:8221/api/v0/uuid`)

  if (validatedUuid.body.validated === 'true') {
    res.send(new UUIDItem(validatedUuid.body.uuid))
  } else {
    res.send({
      message: 'Did not receive a validate UUID'
    })
  }
})

export const UUIDRouter: Router = router
