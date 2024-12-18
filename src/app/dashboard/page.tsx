"use client";
import { AppDispatch, RootState } from "@/app/redux/store";
import ProductForm from "./addproduct";
import { useRouter } from "next/navigation";
import HomePage from "./home";
import Collection from "./collection";
import { useDispatch, useSelector } from "react-redux";
import { collection } from "../redux/slice/collection";
import Setting from "./setting";
import Cart from "./cart";
import ViewProduct from "./viewproduct";

function Page() {
  const route = useRouter();
  const admin = useSelector((item: RootState) => item.auth.admin);
  const login = useSelector((item: RootState) => item.auth.login);

  const listDashboard = [
    { url: "donhang", title: "Đơn Hàng" },
    { url: "dangxuat", title: "Đăng Xuất Tài Khoản" },
  ];

  if (login) {
    listDashboard.splice(1, 0, { url: "caidat", title: " Cài Đặt" });
  }

  if (admin) {
    listDashboard.splice(
      0,
      0,
      { url: "trangchu", title: "Trang Chủ (ADMIN) " },
      { url: "sanpham", title: "Sản Phẩm (ADMIN)" },
      { url: "collection", title: "Collection (ADMIN)" },
      { url: "xemsanpham", title: "Xem Tất Cả Sản Phẩm (ADMIN)" }
    );
  }
  const dispatch = useDispatch<AppDispatch>();

  const nghia: string = useSelector(
    (state: RootState) => state.collection.Collection
  );

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        route.push("/");
        dispatch(collection("trangchu"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" bg-nav bg-opacity-20 h-screen">
      <div className="text-end md:pr-11 md:pt-10 relative bg-nav">
        <span
          onClick={() => {
            route.push("/");
          }}
          className="text-cyan-800 rounded-md text-5xl cursor-pointer absolute top-0 right-4"
        >
          x
        </span>
      </div>
      <div className=" w-full h-scree bg-nav min-h-[1000px]">
        <div className="grid grid-cols-6 md:px-10 px-2 gap-4 pt-16 h-screen">
          <div className=" col-span-2 md:col-span-2 lg:col-span-1 bg-blue-800 text-white md:p-6 h-screen">
            <h2 className="lg:text-2xl text-sm font-semibold text-center">
              Dashboard
            </h2>
            {listDashboard.map((item, index) => {
              return (
                <nav className="mt-8" key={`index-${index}`}>
                  <ul>
                    <li>
                      <span
                        className={
                          nghia === item.url
                            ? `bg-red-300 py-2 w-full block rounded-md text-sm lg:text-md text-center`
                            : "block py-2 rounded-md hover:bg-blue-700 cursor-pointer md:text-sm text-sm lg:text-md text-center"
                        }
                        onClick={() => {
                          if (item.url === "dangxuat") {
                            handleLogout();
                          }
                          dispatch(collection(item.url));
                        }}
                      >
                        {item.title}
                      </span>
                    </li>
                  </ul>
                </nav>
              );
            })}
          </div>

          {nghia === "sanpham" && admin ? (
            <div className="md:col-span-4 lg:col-span-5 col-span-4 md:px-10  ">
              <ProductForm />
            </div>
          ) : nghia === "trangchu" && admin ? (
            <div className="md:col-span-4 lg:col-span-5 col-span-4 md:px-10 ">
              <HomePage />
            </div>
          ) : nghia === "collection" && admin ? (
            <div className="md:col-span-4 lg:col-span-5 col-span-4 md:px-10 ">
              <Collection />
            </div>
          ) : nghia === "caidat" && login ? (
            <div className="md:col-span-4 lg:col-span-5 col-span-4 md:px-10 ">
              <Setting />
            </div>
          ) : nghia === "donhang" ? (
            <div className="md:col-span-4 lg:col-span-5 col-span-4 md:px-10 ">
              <Cart />
            </div>
          ) : nghia === "xemsanpham" && admin ? (
            <div className="md:col-span-4 lg:col-span-5 col-span-4 md:px-10 ">
              <ViewProduct />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
