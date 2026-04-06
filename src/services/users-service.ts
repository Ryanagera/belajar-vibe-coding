import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const usersService = {
	async createUser(data: typeof users.$inferInsert) {
		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.email, data.email));

		if (existingUser.length > 0) {
			throw new Error("email already exists");
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);

		await db.insert(users).values({
			...data,
			password: hashedPassword,
		});

		return {
			message: "User created successfully",
			data: "OK",
		};
	},

	async getAllUsers() {
		return db.select().from(users);
	},
};
