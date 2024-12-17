import IconHeader from "./iconLoginHeader";
import Search from "./search";
import Link from "next/link";
import Cart from "./cart";
import Menu from "./menu";
type SubCollection = {
  name: string;
  options: string[];
  _id: string;
};

type Collection = {
  collection: string;
  subCollection: SubCollection[];
};

const FetchDataCollection = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/collection`, {
      next: { revalidate: 10 }, // Cache dữ liệu trong 10 giây
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
const Header = async () => {
  const data: Collection[] = await FetchDataCollection();

  return (
    <>
      <section className="fixed z-[80] w-full">
        <header className="bg-nav relative">
          <div className="flex md:px-10 px-2">
            <div className="w-1/3"></div>
            <h1 className="md:text-3xl text-xl font-bold md:text-black text-red-500 text-center my-4 md:py-5 w-1/3 ">
              <Link href="/" prefetch={true}>
                Nghĩa Shop
              </Link>
            </h1>
            <div className="flex items-center w-1/3 justify-end gap-x-5">
              <Cart />
              <Search />
              <IconHeader />
              <Menu />
            </div>
          </div>
          <nav className="bg-nav px-3 ">
            <ul className="flex md:gap-6 gap-2 md:flex-grow flex-wrap md:justify-center justify-around ">
              {data.map((item: Collection, index: number) => {
                return (
                  <div key={index} className="relative group">
                    {/* Tên collection */}

                    <Link
                      prefetch={true}
                      href={`/collection/${item.collection}`}
                      className="text-black font-bold md:py-5 block"
                    >
                      {item.collection}
                      <div
                        className={`w-0 h-1 bg-red-700 bg-opacity-50 group-hover:w-full transition-all duration-200 ease-linear`}
                      ></div>
                    </Link>

                    {/* Hiển thị subCollection khi hover */}
                    {item.subCollection && item.subCollection.length > 0 ? (
                      <div
                        className={`absolute left-0 top-3/4 mt-2 hidden bg-white border rounded-lg shadow-lg w-[300] group-hover:block`}
                      >
                        <ul className="text-gray-700">
                          {/* Kiểm tra xem subCollection có tồn tại và không rỗng */}
                          {item.subCollection &&
                          item.subCollection.length > 0 ? (
                            item.subCollection.map(
                              (sub: SubCollection, subIndex: number) => (
                                <li
                                  key={`index-${subIndex}`}
                                  className="my-5 px-8 cursor-pointer "
                                >
                                  {/* Hiển thị tên của subCollection */}
                                  <span className="hover:opacity-40 text-black">
                                    {sub.name}
                                  </span>

                                  {/* Hiển thị options nếu có */}
                                  {sub.options && sub.options.length > 0 && (
                                    <ul className="pl-4 mt-2 text-sm text-gray-500">
                                      {sub.options.map(
                                        (option, optionIndex) => (
                                          <li
                                            key={optionIndex}
                                            className="my-2 hover:opacity-40"
                                          >
                                            {option}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                                </li>
                              )
                            )
                          ) : (
                            // Hiển thị thông báo nếu không có subCollection
                            <></>
                          )}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </ul>
          </nav>
        </header>
      </section>
    </>
  );
};

export default Header;
