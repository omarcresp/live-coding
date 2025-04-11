"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";

import { createClient } from "@/utils/supabase/server";
import { LOGIN_SCHEMA } from "@/app/login/schema";

export async function loginUser(_: unknown, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: LOGIN_SCHEMA,
	});

	if (submission.status !== "success") {
		return submission.reply();
	}

	const supabase = await createClient();
	const { error } = await supabase.auth.signInWithPassword(submission.value);

	if (error) {
		return submission.reply({ formErrors: [error.message] });
	}

	redirect("/dashboard");
}
