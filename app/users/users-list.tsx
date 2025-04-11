import { createClient } from "@/utils/supabase/server";

export async function UsersList() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.admin.listUsers();

	if (error) return <p>No users found... {JSON.stringify(error)}</p>

	return <pre>{JSON.stringify(data, null, 4)}</pre>
}
