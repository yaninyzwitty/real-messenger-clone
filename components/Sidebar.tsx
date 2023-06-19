import getCurrentUser from "@/actions/getCurrentUser";
import MobileComponent from "./MobileComponent";
import SidebarComponent from "./SidebarComponent";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <SidebarComponent currentUser={currentUser} />
      <MobileComponent />

      <main className="lg:pl-20 h-screen">{children}</main>
    </div>
  );
}

export default Sidebar;
