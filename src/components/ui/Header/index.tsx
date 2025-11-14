import { Link } from "react-router-dom";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import type { MouseEventHandler } from "react";

interface headerProps {
  handleOpenSideBar: MouseEventHandler;
}

function Header({ handleOpenSideBar }: headerProps) {
  return (
    <main className="lg:hidden border-b flex fixed bg-white max-lg:w-full justify-between h-16 items-center border-gray-300 shadow-lg z-40">
      <div className="h-full w-16">
        <button
          onClick={handleOpenSideBar}
          className="h-full w-full flex justify-center items-center"
        >
          <Bars3Icon className=" size-10" />
        </button>
      </div>

      <Link
        className="flex md:gap-2 flex-col text-xl font-bold items-end "
        to={"/home"}
      >
        <span>Counter</span>
        <span>Tasks</span>
      </Link>

      <div className="h-full w-16 flex justify-center items-center">
        <Link to={"/profile"}>
          <UserCircleIcon className="size-10" />
        </Link>
      </div>
    </main>
  );
}

export default Header;
