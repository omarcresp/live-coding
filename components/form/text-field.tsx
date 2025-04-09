import { type FieldMetadata, getInputProps } from "@conform-to/react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputAllowedType = "text" | "number" | "email" | "password";

interface TextFieldProps extends React.ComponentProps<"input"> {
	label: string;
	isLoading: boolean;
	field: FieldMetadata<string | number>;
	type: InputAllowedType;
}

export function TextField({
	label,
	field,
	isLoading,
	type = "text",
	...props
}: TextFieldProps) {
	return (
		<div className="grid gap-2">
			<Label htmlFor={field.id}>{label}</Label>

			<Input
				{...props}
				{...getInputProps(field, { type })}
				key={field.id}
				defaultValue={field.value}
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
