import type { Config } from "drizzle-kit";

export default {
	schema: "./src/db/schema.ts",
	out: "./drizzle",
	driver: "mysql2",
	dbCredentials: {
		uri: process.env.DATABASE_URL || "mysql://root:password@localhost:3306/belajar_vibe_coding",
	},
} satisfies Config;
