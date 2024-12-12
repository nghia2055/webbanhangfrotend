import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

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
type sub = {
  id: string;
  subCollection: string;
};
function ProductItems({
  productsData = [],
  Subcollection = [],
}: {
  productsData?: data[];
  Subcollection: sub[];
}) {
  return (
    <section className="col-span-4">
      <div className=" grid grid-cols-4 ">
        {productsData.map((item: data, index: number) => {
          const price = String(item.price).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            "."
          );
          const src = item.productImages[5];
          return (
            <div
              className=" w-full h-auto border-[1px] flex flex-col items-center "
              key={index}
            >
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
                  className="text-xs bg-[rgb(249,248,248)] w-full text-center opacity-55"
                >
                  {item.collection}
                </Link>
              </div>
              <div className="mt-2 text-center space-y-3">
                <h2 className="text-sm opacity-80 leading-none">
                  {item.productName}
                </h2>
                <div className="text-md text-red-700 font-bold">
                  {price}
                  <span className="underline">đ</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default memo(ProductItems);
