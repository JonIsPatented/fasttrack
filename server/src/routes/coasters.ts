import { Router, type Request, type Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

const router = Router()

const path = '../database/database.db'
const db = new Database(path)
const adapter = new PrismaBetterSqlite3({ url: path })

const prisma = new PrismaClient({ adapter })

type CoasterQuery = {
    coaster_id?: string;
    name?: string;
    material_id?: string;
    length_ft?: string;
    max_g_force?: string;
    height_ft_min?: string;
    height_ft_max?: string;
    top_speed_mph_min?: string;
    top_speed_mph_max?: string;
    first_year_construction?: string;
    first_year_operation?: string;
    home_park_id?: string;
    manufacturer_id?: string;
    color_id?: string;
    trait_type_id?: string;
};

router.get(
    "/",
    async (
        req: Request<Record<string, string>, unknown, unknown, CoasterQuery>,
        res: Response
    ) => {
        try {
            const andConditions: Prisma.CoasterWhereInput[] = [];

            const coasterNameRaw = req.query.name;
            const coasterName = coasterNameRaw ? coasterNameRaw.trim() : "";
            if (coasterName) {
                andConditions.push({
                    name: { contains: coasterName },
                });
            }

            const coasterIdNumber = req.query.coaster_id ? Number(req.query.coaster_id) : NaN;
            if (Number.isInteger(coasterIdNumber)) {
                andConditions.push({ coaster_id: coasterIdNumber });
            }

            const materialIdNumber = req.query.material_id ? Number(req.query.material_id) : NaN;
            if (Number.isInteger(materialIdNumber)) {
                andConditions.push({ material_id: materialIdNumber });
            }

            const constructionYearNumber = req.query.first_year_construction
                ? Number(req.query.first_year_construction)
                : NaN;
            if (Number.isInteger(constructionYearNumber)) {
                andConditions.push({ first_year_construction: constructionYearNumber });
            }

            const operationYearNumber = req.query.first_year_operation
                ? Number(req.query.first_year_operation)
                : NaN;
            if (Number.isInteger(operationYearNumber)) {
                andConditions.push({ first_year_operation: operationYearNumber });
            }

            const homeParkIdNumber = req.query.home_park_id ? Number(req.query.home_park_id) : NaN;
            if (Number.isInteger(homeParkIdNumber)) {
                andConditions.push({ home_park_id: homeParkIdNumber });
            }

            const manufacturerIdNumber = req.query.manufacturer_id
                ? Number(req.query.manufacturer_id)
                : NaN;
            if (Number.isInteger(manufacturerIdNumber)) {
                andConditions.push({ manufacturer_id: manufacturerIdNumber });
            }

            const lengthFeetNumber = req.query.length_ft ? Number(req.query.length_ft) : NaN;
            if (Number.isFinite(lengthFeetNumber)) {
                andConditions.push({ length_ft: lengthFeetNumber });
            }

            const maxGForceNumber = req.query.max_g_force ? Number(req.query.max_g_force) : NaN;
            if (Number.isFinite(maxGForceNumber)) {
                andConditions.push({ max_g_force: maxGForceNumber });
            }

            const minHeightFeet = req.query.height_ft_min ? Number(req.query.height_ft_min) : NaN;
            const maxHeightFeet = req.query.height_ft_max ? Number(req.query.height_ft_max) : NaN;
            if (Number.isFinite(minHeightFeet) || Number.isFinite(maxHeightFeet)) {
                andConditions.push({
                    height_ft: {
                        ...(Number.isFinite(minHeightFeet) ? { gte: minHeightFeet } : {}),
                        ...(Number.isFinite(maxHeightFeet) ? { lte: maxHeightFeet } : {}),
                    },
                });
            }

            const minTopSpeed = req.query.top_speed_mph_min ? Number(req.query.top_speed_mph_min) : NaN;
            const maxTopSpeed = req.query.top_speed_mph_max ? Number(req.query.top_speed_mph_max) : NaN;
            if (Number.isFinite(minTopSpeed) || Number.isFinite(maxTopSpeed)) {
                andConditions.push({
                    top_speed_mph: {
                        ...(Number.isFinite(minTopSpeed) ? { gte: minTopSpeed } : {}),
                        ...(Number.isFinite(maxTopSpeed) ? { lte: maxTopSpeed } : {}),
                    },
                });
            }

            const colorIdNumber = req.query.color_id ? Number(req.query.color_id) : NaN;
            if (Number.isInteger(colorIdNumber)) {
                andConditions.push({
                    OR: [
                        { track_colors: { some: { color_id: colorIdNumber } } },
                        { support_colors: { some: { color_id: colorIdNumber } } },
                    ],
                });
            }

            const traitTypeIdNumber = req.query.trait_type_id ? Number(req.query.trait_type_id) : NaN;
            if (Number.isInteger(traitTypeIdNumber)) {
                andConditions.push({
                    coasterTraits: { some: { trait_type_id: traitTypeIdNumber } },
                });
            }

            const whereClause: Prisma.CoasterWhereInput =
                andConditions.length > 0 ? { AND: andConditions } : {};

            const coasters = await prisma.coaster.findMany({
                where: whereClause,
                include: {
                    manufacturer: true,
                    material: true,
                    home_park: true,
                    track_colors: { include: { color: true } },
                    support_colors: { include: { color: true } },
                    coasterTraits: { include: { trait_type: true } },
                },
            });

            res.json(coasters);
        } catch {
            res.status(500).json({ error: "Something went wrong fetching coasters" });
        }
    }
);

export default router

