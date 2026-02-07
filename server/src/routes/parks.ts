import { Router, type Request, type Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

const router = Router()

const path = '../database/database.db'
const db = new Database(path)
const adapter = new PrismaBetterSqlite3({ url: path })

const prisma = new PrismaClient({ adapter })

router.get('/get', async (req: Request<{}, {}, {}, { verbose: boolean, id: number }>, res: Response) => {
    const verboseCoasterInclude = {
        include: {
            manufacturer: true,
            material: true,
            home_park: true,
            track_colors: {
                include: {
                    color: true
                }
            },
            support_colors: {
                include: {
                    color: true
                }
            },
            coasterTraits: {
                include: {
                    trait_type: true
                }
            }
        }
    }

    const { verbose, id } = req.query

    try {
        const parks = await prisma.park.findMany({
            include: {
                coasters: verbose ? verboseCoasterInclude : true
            },
            where: id ? { park_id: Number(id) } : {}
        })
        res.json(parks)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong fetching parks' })
    }
})

export default router


