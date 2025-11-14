import { Outlet } from "react-router-dom";
import SideBar from "./components/ui/SideBar";

function Layout() {
;





  return (
    <main className="h-screen">
      <div className="flex h-full">
        <SideBar />
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
