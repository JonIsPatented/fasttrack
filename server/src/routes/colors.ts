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
            coaster: {
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
        }
    }

    const { verbose, id } = req.query

    try {
        const colors = await prisma.color.findMany({
            include: {
                coaster_supports: verbose ? verboseCoasterInclude : true,
                coaster_tracks: verbose ? verboseCoasterInclude : true
            },
            where: id ? { color_id: Number(id) } : {}
        })
        res.json(colors)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong fetching colors' })
    }
})

export default router

