-- CreateTable
CREATE TABLE "Coaster" (
    "coaster_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "material_id" INTEGER NOT NULL,
    "length_ft" REAL NOT NULL,
    "height_ft" REAL NOT NULL,
    "top_speed_mph" REAL NOT NULL,
    "max_g_force" REAL NOT NULL,
    "first_year_construction" INTEGER NOT NULL,
    "first_year_operation" INTEGER NOT NULL,
    "home_park_id" INTEGER NOT NULL,
    "manufacturer_id" INTEGER NOT NULL,
    CONSTRAINT "Coaster_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Material" ("material_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Coaster_home_park_id_fkey" FOREIGN KEY ("home_park_id") REFERENCES "Park" ("park_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Coaster_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "Manufacturer" ("manufacturer_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Material" (
    "material_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Park" (
    "park_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state_province" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "website" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "manufacturer_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "founded_year" INTEGER NOT NULL,
    "country_code" TEXT NOT NULL,
    "website" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Color" (
    "color_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CoasterTrait" (
    "trait_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coaster_id" INTEGER NOT NULL,
    "trait_type_id" INTEGER NOT NULL,
    "metadata" JSONB NOT NULL,
    CONSTRAINT "CoasterTrait_coaster_id_fkey" FOREIGN KEY ("coaster_id") REFERENCES "Coaster" ("coaster_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CoasterTrait_trait_type_id_fkey" FOREIGN KEY ("trait_type_id") REFERENCES "TraitType" ("trait_type_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TraitType" (
    "trait_type_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CoasterTrackColor" (
    "coaster_id" INTEGER NOT NULL,
    "color_id" INTEGER NOT NULL,

    PRIMARY KEY ("coaster_id", "color_id"),
    CONSTRAINT "CoasterTrackColor_coaster_id_fkey" FOREIGN KEY ("coaster_id") REFERENCES "Coaster" ("coaster_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CoasterTrackColor_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color" ("color_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CoasterSupportColor" (
    "coaster_id" INTEGER NOT NULL,
    "color_id" INTEGER NOT NULL,

    PRIMARY KEY ("coaster_id", "color_id"),
    CONSTRAINT "CoasterSupportColor_coaster_id_fkey" FOREIGN KEY ("coaster_id") REFERENCES "Coaster" ("coaster_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CoasterSupportColor_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color" ("color_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
