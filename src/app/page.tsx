import Link from "next/link";
import Image from "next/image";
import Header from "@/app/component/header/header";
import Footer from "@/app/component/header/footer";

type data = {
  collection: string;
  description: string;
  options: string[];
  price: number;
  productImages: string[];
  productName: string;
  size: string[];
  subCollection: string;
  _id: string;
};

export default async function Page() {
  const getProductHome = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/producthome`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const data = await getProductHome();

  return (
    <>
      <Header />
      <main className="max-w-[1480px] mx-auto md:pt-48 grid gap-y-6 ">
        <section className="grid grid-cols-5 gap-x-10 pb-10">
          {data?.map((item: data, index: number) => {
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
                  <Link
                    href={
                      item.collection && item._id
                        ? `/collection/${item.collection}/${item._id}`
                        : "/"
                    }
                  >
                    <Image
                      src={src}
                      width={500}
                      height={400}
                      alt="giày"
                      className=" hover:scale-x-[-1] hover:opacity-50  "
                    />
                  </Link>
                  <Link
                    href={item.collection ? `/${item.collection}` : "/"}
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
        </section>
      </main>
      <Footer />
    </>
  );
}
