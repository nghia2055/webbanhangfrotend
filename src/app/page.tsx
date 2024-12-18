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

export default async function Home() {
  const getProductHome = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/producthome`);
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
      <main className="max-w-[1480px] mx-auto md:pt-32 grid gap-y-6 pt-36 p-4 lg:pt-40 sm:pt-28 ">
        <section className="grid md:grid-cols-4 md:gap-x-10 md:pb-10 grid-cols-2 md:pt-16 lg:pt-8 lg:grid-cols-5">
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
                    <Link
                      href={
                        item.collection && item._id
                          ? `/collection/${item.collection}/${item._id}`
                          : "/"
                      }
                    >
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
                      <span className="line-clamp-2 md:h-12 sm:my-2 px-2 leading-4 max-h-13 sm:max-h-12 break-all ">
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
      <Footer />
    </>
  );
}
