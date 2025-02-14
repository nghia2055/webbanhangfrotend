"use client";
import { IoMenuSharp } from "react-icons/io5";

import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import { useRouter } from "next/navigation";

function Menu() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const handleResize = () => {
    // Kiểm tra nếu chiều rộng cửa sổ nhỏ hơn 756px thì set open = true, ngược lại = false
    if (window.outerWidth < 767) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useLayoutEffect(() => {
    handleResize();

    // Lắng nghe sự kiện resize
    window.addEventListener("resize", handleResize);

    // Cleanup function khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <>
      {open ? (
        <>
          <div className="text-3xl text-end cursor-pointer">
            {/* Icon Menu */}
            <div
              onClick={() => setMenu(!menu)}
              className="cursor-pointer z-[20] relative"
            >
              <IoMenuSharp />
            </div>

            {/* Menu Animation */}
            {menu && (
              <motion.div
                initial={{ x: 0, opacity: 0 }} // Vị trí ban đầu (bên trái)
                animate={{ x: -150, opacity: 1 }} // Vị trí kết thúc (trở về gốc)
                exit={{ x: -200, opacity: 0 }} // Animation khi ẩn đi
                transition={{ duration: 0.5, ease: "easeOut" }} // Hiệu ứng mượt mà
                className="absolute z-[10] top-0 w-60 h-screen bg-nav shadow-md"
              >
                <div className="text-black text-start text-sm flex flex-col pl-2 mt-16 space-y-4 ">
                  <Link href="/login">Đăng Nhập</Link>
                  <Link href="/register">Đăng Ký</Link>
                  <Link href="/MenuSearch">Tìm Kiếm</Link>
                  <Link href="/cart">Giỏ Hàng</Link>
                  <Link href="/dashboard">Dashboard</Link>
                </div>
              </motion.div>
            )}
          </div>
        </>
      ) : (
        " "
      )}
    </>
  );
}

export default Menu;
