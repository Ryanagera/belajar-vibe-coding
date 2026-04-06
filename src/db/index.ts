import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const isTest = process.env.NODE_ENV === "test";

const connection = await mysql.createConnection(
	(process.env.DATABASE_URL as any) || {
		host: "127.0.0.1",
		port: 3306,
		user: "root",
		database: "belajar_vibe_coding",
	}
);

export const db = drizzle(connection, { schema, mode: "default" });
