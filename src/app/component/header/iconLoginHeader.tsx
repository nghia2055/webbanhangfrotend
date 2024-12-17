import { MdAccountCircle } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import Link from "next/link";
import { cookies } from "next/headers";

async function IconHeader() {
  let login = false;
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  if (token?.value) {
    login = true;
  } else {
    login = false;
  }

  return (
    <>
      <Link
        href={login ? "/dashboard" : "/login"}
        className="w-[40px] h-[35px] items-center relative md:flex hidden"
      >
        {login ? (
          <FaUsersCog className="text-4xl" />
        ) : (
          <MdAccountCircle className="w-[40px] h-[35px] cursor-pointer" />
        )}
      </Link>
    </>
  );
}

export default IconHeader;
