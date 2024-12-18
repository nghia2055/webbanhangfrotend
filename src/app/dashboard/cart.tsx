import Image from "next/image";
import { useEffect, useState } from "react";

type product = {
  amount: string;
  name: string;
  price: string;
  productImages: string;
  size: string;
  _id: string;
};

type data = {
  address: string;
  city: string;
  id: string;
  methodPay: string;
  number: number;
  product: product[];
  ship: string;
  _id: string;
};
function Cart() {
  const [data, setData] = useState<data[]>([]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/auth/dashboardorder`);
        const data = await res.json();
        console.log(data);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className="text-center flex justify-center text-xl ">
      <main>
        <section className="grid md:grid-cols-4 md:gap-x-10 md:pb-10 grid-cols-3 lg:grid-cols-5">
          {Array.isArray(data) &&
            data?.map((item: any, index: number) => {
              return JSON.parse(item.product).map(
                (item: product, index: number) => {
                  const price = String(item.price).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    "."
                  );
                  return (
                    <>
                      <div
                        className=" w-full h-auto border-[1px] flex flex-col items-center px-1"
                        key={`${item._id}-${index}`}
                      >
                        <div className="flex flex-col items-center ">
                          <Image
                            priority
                            src={item.productImages}
                            width={500}
                            height={400}
                            alt="giày"
                            className=" hover:scale-x-[-1] hover:opacity-50  "
                          />

                          <span className="text-xs bg-[rgb(249,248,248)] w-full text-center opacity-55">
                            {item.size}
                          </span>
                        </div>
                        <div className="mt-2 text-center ">
                          <h2 className="text-sm opacity-80 leading-none">
                            <span className="line-clamp-2 break-all ">
                              {item.name}
                            </span>
                          </h2>
                          <div className="md:text-md text-xs text-red-700 font-bold">
                            {price}
                            <span className="underline">đ</span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              );
            })}
        </section>
      </main>
    </div>
  );
}

export default Cart;
