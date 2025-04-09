import { z } from "zod";

export const LOGIN_SCHEMA = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});
