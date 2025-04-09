import { type FieldMetadata, getInputProps } from "@conform-to/react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextFieldProps extends React.ComponentProps<"input"> {
	label: string;
	isLoading: boolean;
	field: FieldMetadata<string | number>;
}

export function TextField({
	label,
	field,
	isLoading,
	type,
	...props
}: TextFieldProps) {
	return (
		<div className="grid gap-2">
			<Label htmlFor={field.id}>{label}</Label>

			<Input
				{...props}
				{...getInputProps(field, { type: "email" })}
				defaultValue={field.value}
				type={type}
				placeholder="name@example.com"
				autoCapitalize="none"
				autoComplete="email"
				autoCorrect="off"
				disabled={isLoading}
			/>

			<span
				className="text-xs ml-1 font-medium text-destructive"
				id={field.errorId}
			>
				{field.errors}
			</span>
		</div>
	);
}
