import { drizzle } from "drizzle-orm/node-postgres";
import "../envConfig.ts";

// You can specify any property from the node-postgres connection options
export const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL!,
    },
    casing: "snake_case",
});

export * from "./schema";
