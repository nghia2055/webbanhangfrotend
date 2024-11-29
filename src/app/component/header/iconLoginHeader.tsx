"use client";

import { MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { FaUsersCog } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

function IconHeader() {
  const Route = useRouter();

  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  const handleOpenDashboard = () => {
    Route.push("/dashboard");
  };

  return (
    <>
      <Link
        href={isLoggedIn ? "/dashboard" : "/login"}
        className="w-[40px] h-[35px] flex items-center relative"
      >
        {isLoggedIn ? (
          <FaUsersCog className="text-4xl" onClick={handleOpenDashboard} />
        ) : (
          <MdAccountCircle className="w-[40px] h-[35px] cursor-pointer" />
        )}
      </Link>
    </>
  );
}

export default IconHeader;
