"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Data = {
  collection: string;
  _id: string;
  createdAt: string;
  description: string;
  price: number;
  productImages: string[];
  productName: string;
  size: string;
  amount: number;
};

function Search() {
  const [search, setSearch] = useState(false);
  const [data, setData] = useState([]);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setSearch(!search);
  };
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!e.target.value.trim()) {
      setData([]);
    } else {
      try {
        if (!process.env.NEXT_PUBLIC_URL) {
          throw new Error("API URL is undefined");
        }
        const res = await fetch(
          `https://backendwebbanhang-sigma.vercel.app/search/${e.target.value}`
        );
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/searchproduct/${searchQuery}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleIconSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/searchproduct/${searchQuery}`);
    }
  };

  return (
    <span ref={ref} onClick={handleFocusInput}>
      <CiSearch
        className="w-[40px] h-[35px] cursor-pointer"
        onClick={handleSearch}
      />
      {search ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className=" md:px-14 md:py-4 absolute top-full left-0  min-h-[440px] bg-white w-full"
        >
          <div className="z-[20000] overflow-auto h-96">
            <div className="relative ">
              <input
                ref={inputRef}
                placeholder="Tìm kiếm"
                className="w-full border-b-2 outline-none h-14 pl-12 border-black"
                onChange={handleChange}
                onKeyDown={handleOnKeyDown}
              />
              <CiSearch
                className="w-[40px] h-[35px] cursor-pointer  absolute top-1/2 -translate-y-1/2 left-0 "
                onClick={handleIconSearch}
              />
            </div>
            <p className="font-bold mt-3">TRENDING</p>
            <div>
              {data.map((item: Data, index) => {
                return (
                  <Link
                    href={`/collection/${item.collection}/${item._id}`}
                    key={`index-${index}`}
                    className="flex space-x-6 border-b-2 mb-2 border-opacity-30 border-b-amber-100"
                  >
                    <Image
                      src={item.productImages[0]}
                      width={70}
                      height={70}
                      alt=""
                      className="col-span-2"
                    />
                    <div className="col-span-8">
                      <p>{item.productName}</p>
                      <span>{item.price}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </span>
  );
}

export default Search;
