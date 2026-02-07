import { Router, type Request, type Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Coasters go here')
})

export default router
