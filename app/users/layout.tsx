import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/Sidebar";
import UserListComponent from "@/components/UserListComponent";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <div className="h-full">
      {/* @ts-ignore */}
      <Sidebar>
        <UserListComponent users={users} />

        {children}
      </Sidebar>
    </div>
  );
}
