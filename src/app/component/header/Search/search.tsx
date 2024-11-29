"use client";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";

function Search() {
  const [search, setSearch] = useState(false);

  const handleSearch = () => {
    setSearch(!search);
  };
  return (
    <span>
      <CiSearch
        className="w-[40px] h-[35px] cursor-pointer top-0"
        onClick={handleSearch}
      />
      {search ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className=" md:px-14 md:py-4 absolute top-full left-0  min-h-[440px] bg-white w-full "
        >
          <div>
            <div className="relative">
              <input
                placeholder="Tìm kiếm"
                className="w-full border-b-2 outline-none h-14 pl-12 border-black"
              />
              <CiSearch className="w-[40px] h-[35px] cursor-pointer  absolute top-1/2 -translate-y-1/2 left-0 " />
            </div>
            <p className="font-bold mt-3">TRENDING</p>
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </span>
  );
}

export default Search;
