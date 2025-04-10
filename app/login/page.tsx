"use client";

import { useActionState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/form/text-field";

import { loginUser } from "@/app/login/actions";
import { LOGIN_SCHEMA } from "@/app/login/schema";

function UserAuthForm() {
	const [lastResult, loginAction, pending] = useActionState(
		loginUser,
		undefined,
	);
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: LOGIN_SCHEMA });
		},
	});

	useEffect(() => {
		if (form.errors?.length) {
			toast.error(form.errors.join());
		}
	}, [form.errors]);

	return (
		<div className="min-h-dvh flex items-center">
			<div className="grid gap-6 mx-auto max-w-xl">
				<Image
					aria-hidden
					priority
					className="mx-8"
					src="/assets/grayola-White.png"
					alt="File icon"
					width={305}
					height={100}
				/>

				<form {...getFormProps(form)} action={loginAction}>
					<div className="grid gap-4">
						<div className="grid gap-1">
							<TextField
								type="email"
								label="Email"
								placeholder="name@example.com"
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
								field={fields.email}
								isLoading={pending}
							/>
						</div>

						<div className="grid gap-1">
							<TextField
								type="password"
								label="Password"
								placeholder="*******"
								autoComplete="current-password"
								field={fields.password}
								isLoading={pending}
							/>
						</div>

						<Button disabled={pending}>
							{pending && (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							)}
							Sign In
						</Button>
					</div>
				</form>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>

					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>

				<Button variant="outline" type="button" disabled={pending}>
					{pending ? (
						<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<Icons.google className="mr-2 h-4 w-4" />
					)}{" "}
					Google
				</Button>
			</div>
		</div>
	);
}

export default UserAuthForm;
