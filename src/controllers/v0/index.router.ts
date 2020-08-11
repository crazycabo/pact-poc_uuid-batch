import { Router, Request, Response } from 'express'
import { UUIDRouter } from './uuid/routes/uuid.router'

const router: Router = Router()

router.use('/uuid', UUIDRouter)

router.get('/', async (req: Request, res: Response) => {
  res.send(`V0`)
})

export const IndexRouter: Router = router
