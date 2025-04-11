import { UsersList } from "./users-list";

export default function Page() {
  return (
    <div className="grid gap-4">
      <div className="flex">
        <div>buscador</div>
        <div className="ml-auto">create user</div>
      </div>

      <UsersList />
    </div>
  )
}
