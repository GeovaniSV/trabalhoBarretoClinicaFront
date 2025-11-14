import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./components/ui/SideBar";
import Header from "./components/ui/Header";
import { useEffect, useState } from "react";

function Layout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const location = useLocation();
  let currentLocation = "";

  const handleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  useEffect(() => {
    if (currentLocation !== location.pathname) {
      currentLocation = location.pathname;
      setOpenSideBar(false);
    }
  }, [location.pathname]);

  return (
    <main className="h-screen">
      <Header handleOpenSideBar={handleSideBar} />
      <div className="flex h-full">
        <SideBar sideBarStatus={openSideBar} />
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
