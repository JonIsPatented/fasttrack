import { Router, type Request, type Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'


const router = Router()

const path = '../database/database.db'
const db = new Database(path)
const adapter = new PrismaBetterSqlite3({ url: path })

const prisma = new PrismaClient({ adapter })

router.get('/', async (req: Request, res: Response) => {
    try {
        const coasters = await prisma.coaster.findMany()
        res.json(coasters)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong fetching coasters' })
    }
})

export default router
