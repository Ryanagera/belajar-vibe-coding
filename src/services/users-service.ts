import { db } from "../db";
import { users, sessions } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import crypto from "crypto";

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

	async loginUser(data: { email: string; password: string }) {
		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.email, data.email));

		if (existingUser.length === 0) {
			throw new Error("email or password is wrong");
		}

		const user = existingUser[0];
		const isPasswordValid = await bcrypt.compare(data.password, user.password);

		if (!isPasswordValid) {
			throw new Error("email or password is wrong");
		}

		const token = crypto.randomUUID();

		await db.insert(sessions).values({
			token,
			userId: user.id,
		});

		return {
			data: token,
		};
	},

	async logoutUser(token: string) {
		const [result] = await db.delete(sessions).where(eq(sessions.token, token));

		if (result.affectedRows === 0) {
			throw new Error("unauthorized");
		}

		return {
			data: "OK",
		};
	},

	async getCurrentUser(token: string) {
		const sessionRecord = await db
			.select()
			.from(sessions)
			.where(eq(sessions.token, token));

		if (sessionRecord.length === 0) {
			throw new Error("unauthorized");
		}

		const userInfo = await db
			.select()
			.from(users)
			.where(eq(users.id, sessionRecord[0].userId));

		if (userInfo.length === 0) {
			throw new Error("unauthorized");
		}

		const { password, ...safeUser } = userInfo[0];
		return { data: safeUser };
	},

	async getAllUsers() {
		return db.select().from(users);
	},
};
