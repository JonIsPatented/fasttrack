import express from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'
import coasterRouter from './routes/coasters.ts'
import colorRouter from './routes/colors.ts'
import materialRouter from './routes/materials.ts'

const app = express()
const PORT = 3000

const path = '../database/database.db'
const db = new Database(path)
const adapter = new PrismaBetterSqlite3({ url: path })

const prisma = new PrismaClient({ adapter })

app.use(express.json())

app.use('/api/coasters', coasterRouter)
app.use('/api/colors', colorRouter)
app.use('/api/materials', materialRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

process.on('beforeExit', async () => {
    await prisma.$disconnect()
})
