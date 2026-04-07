import { Elysia, t } from "elysia";
import { usersService } from "../services/users-service";
import { bearer } from "@elysiajs/bearer";

export const usersRoute = new Elysia({ prefix: "/api" })
	.use(bearer())
	.post("/users", async ({ body, set }) => {
		try {
			const result = await usersService.createUser(body);
			return result;
		} catch (error: any) {
			set.status = 400;
			return {
				message: error.message,
				data: "ERROR",
			};
		}
	}, {
		body: t.Object({
			name: t.String(),
			email: t.String(),
			password: t.String(),
		})
	})
	.post("/users/login", async ({ body, set }) => {
		try {
			const result = await usersService.loginUser(body);
			return result;
		} catch (error: any) {
			set.status = 400;
			return {
				message: error.message,
			};
		}
	}, {
		body: t.Object({
			email: t.String(),
			password: t.String(),
		})
	})
	.get("/users/current", async ({ bearer, set }) => {
		try {
			if (!bearer) throw new Error("unauthorized");
			const result = await usersService.getCurrentUser(bearer);
			return result;
		} catch (error: any) {
			set.status = 401;
			return {
				message: "unauthorized"
			};
		}
	})
	.post("/users/logout", async ({ bearer, set }) => {
		try {
			if (!bearer) throw new Error("unauthorized");
			const result = await usersService.logoutUser(bearer);
			return result;
		} catch (error: any) {
			set.status = 401;
			return {
				message: "unauthorized"
			};
		}
	})
	.get("/users", async () => {
		return await usersService.getAllUsers();
	});
