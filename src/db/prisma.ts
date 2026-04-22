import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import globals from "../globals.js";

const adapter = new PrismaPg({connectionString: globals.DATABASE_URL});

const prisma = new PrismaClient({adapter});

export default prisma;