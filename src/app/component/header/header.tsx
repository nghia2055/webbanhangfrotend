"use client";

import TitleHeader from "@/app/component/header/title";
import { FaBagShopping } from "react-icons/fa6";
import IconHeader from "./iconLoginHeader";
import Search from "./Search/search";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  return (
    <>
      <section className="z[-10000]  relative">
        <header>
          <TitleHeader />
          <nav className="bg-nav px-3 pt-3 h-32 ">
            <div className="flex items-center justify-between  ">
              <div className="w-44"></div>
              <h1 className="text-5xl font-bold text-white w-96 text-center">
                Nghĩa
              </h1>
              <section className=" flex justify-around px-5 gap-x-4 items-center ">
                <FaBagShopping className="w-[40px] h-[35px] cursor-pointer " />
                <Search />
                <IconHeader />
              </section>
            </div>

            <div className="flex items-end pb-2">
              <ul className="flex gap-6 flex-grow justify-center re">
                <li>Shop All</li>
                <li>Shop All</li>
                <li>Shop All</li>
                <li>Shop All</li>
              </ul>
              <h2 className="mt-4 ml-auto border-2 border-black cursor-pointer">
                FIND YOUR ROUTINE QUIZ
              </h2>
            </div>
          </nav>
        </header>
      </section>
    </>
  );
};

export default Header;
