"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

export default function ViewProduct() {
  const [data, setData] = useState<data[]>([]);

  useEffect(() => {
    const res = async () => {
      try {
        const fetchData = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/product/all`
        );
        const Data = await fetchData.json();

        setData(Data);
      } catch (error) {
        console.log(error);
      }
    };
    res();
  });

  const handleRemove = async (item: string) => {
    try {
      const fetchData = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/removeproduct/all?id=${item}`
      );
      if (fetchData.ok) {
        toast("Bạn đã xóa sản phẩm thành công.", {
          action: {
            label: "✖", // Biểu tượng nút đóng
            onClick: () => toast.dismiss(), // Đóng Toast
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast("Xóa thất bại.", {
        action: {
          label: "✖", // Biểu tượng nút đóng
          onClick: () => toast.dismiss(), // Đóng Toast
        },
      });
    }
  };

  return (
    <>
      {data && data.length > 0 ? (
        <section className="col-span-4">
          <div className=" grid md:grid-cols-4 grid-cols-3 pb-10">
            {data &&
              data.map((item, index: number) => {
                const price = String(item.price).replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  "."
                );
                const src = item.productImages[5];
                return (
                  <div
                    className=" w-full border-[1px] flex flex-col items-center "
                    key={index}
                  >
                    <div
                      className="font-bold text-red-600 cursor-pointer"
                      onClick={() => {
                        handleRemove(item._id);
                      }}
                    >
                      XÓA
                    </div>
                    <div className="flex flex-col items-center ">
                      <Link href={`/collection/${item.collection}/${item._id}`}>
                        <Image
                          src={src}
                          width={500}
                          height={400}
                          alt="giày"
                          className=" hover:scale-x-[-1] hover:opacity-50  "
                        />
                      </Link>
                      <Link
                        href={`/${item.collection}`}
                        className="text-xs bg-[rgb(249,248,248)] w-full text-center opacity-55 line-clamp-1"
                      >
                        {item.collection}
                      </Link>
                    </div>
                    <div className="mt-2 text-center space-y-3 w-15 ">
                      <h2 className="text-xs opacity-80 leading-none line-clamp-2 sm:h-7 h-6 ">
                        {item.productName}
                      </h2>
                      <div className="md:text-md text-xs text-red-700 font-bold ">
                        {price}
                        <span className="underline">đ</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      ) : (
        <div className="text-center flex mt-20 justify-center text-xl ">
          Không có sản phẩm nào
        </div>
      )}
    </>
  );
}
