"use client";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

type data = {
  collection: string;
  _id: string;
  createdAt: string;
  description: string;
  price: number;
  productImages: string[];
  productName: string;
  size: Array<string>;
  subCollection: string;
};

function SearchMenu() {
  const [data, setData] = useState<data[]>([]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.trim()) {
      setData([]);
    } else {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/searchMenu/${e.target.value}`
        );
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <input
        onChange={handleChange}
        className=" border-2 rounded-md w-full bg-slate-300 text-black pl-2 h-12 text-xs "
        placeholder="Hãy nhập sản phẩm bạn muốn tìm?"
      />
      <main className="max-w-[1480px] mx-auto md:pt-2 grid gap-y-6 pt-8 p-4 lg:pt-8 sm:pt-8 ">
        <section className="grid md:grid-cols-4 md:gap-x-10 md:pb-10 grid-cols-2 md:pt-8 lg:pt-2 lg:grid-cols-5">
          {Array.isArray(data) &&
            data?.map((item: data, index: number) => {
              const price = String(item.price).replace(
                /\B(?=(\d{3})+(?!\d))/g,
                "."
              );
              const src = item.productImages[4];
              return (
                <div
                  className=" w-full h-auto border-[1px] flex flex-col items-center"
                  key={index}
                >
                  <div className="flex flex-col items-center ">
                    <Link href={`/collection/${item.collection}/${item._id}`}>
                      <Image
                        priority
                        src={src}
                        width={500}
                        height={400}
                        alt="giày"
                        className=" hover:scale-x-[-1] hover:opacity-50  "
                      />
                    </Link>
                    <Link
                      href={`/collection/${item.collection}/`}
                      className="text-xs bg-[rgb(249,248,248)] w-full text-center opacity-55"
                    >
                      {item.collection}
                    </Link>
                  </div>
                  <div className="mt-2 text-center ">
                    <h2 className="text-sm opacity-80 leading-none">
                      <span className="line-clamp-2 leading-5 md:h-12 text-ellipsis px-2 max-h-9 sm:h-9  break-all">
                        {item.productName}
                      </span>
                    </h2>
                    <div className="text-md text-red-700 font-bold">
                      {price}
                      <span className="underline">đ</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </section>
      </main>
    </>
  );
}

export default SearchMenu;
