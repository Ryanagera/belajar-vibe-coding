import { Elysia, t } from "elysia";
import { usersService } from "../services/users-service";

export const usersRoute = new Elysia({ prefix: "/api" })
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
	.get("/users/current", async ({ headers, set }) => {
		try {
			const result = await usersService.getCurrentUser(headers.authorization);
			return result;
		} catch (error: any) {
			set.status = 401;
			return {
				message: "unauthorized"
			};
		}
	}, {
		headers: t.Object({
			authorization: t.Optional(t.String()),
		})
	})
	.get("/users", async () => {
		return await usersService.getAllUsers();
	});
