"use client";
import { AppDispatch, RootState } from "@/app/redux/store";
import ProductForm from "./(dashboard)/addproduct/page";
import { useRouter } from "next/navigation";
import HomePage from "./(dashboard)/home/page";
import Collection from "./(dashboard)/collection/page";
import { useDispatch, useSelector } from "react-redux";
import { collection } from "../redux/slice/collection";
import Setting from "./(dashboard)/setting/page";
import Cart from "./(dashboard)/cart/page";
import ViewProduct from "./(dashboard)/viewproduct/page";

function Dashboard() {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-[1500] bg-nav bg-opacity-20">
      <div className="text-end pr-11 pt-10  ">
        <span
          onClick={() => {
            route.push("/");
          }}
          className="text-cyan-800 rounded-md text-5xl cursor-pointer"
        >
          x
        </span>
      </div>
      <div className=" w-full h-screen">
        <div className="grid grid-cols-6 px-10">
          <div className="w-64 bg-blue-800 text-white p-6 h-screen">
            <h2 className="text-2xl font-semibold text-center">Dashboard</h2>
            {listDashboard.map((item, index) => {
              return (
                <nav className="mt-8" key={`index-${index}`}>
                  <ul>
                    <li>
                      <span
                        className="block py-2 rounded-md hover:bg-blue-700 cursor-pointer"
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
            <div className="col-span-5 px-10 ">
              <ProductForm />
            </div>
          ) : nghia === "trangchu" && admin ? (
            <div className="col-span-5 px-10 ">
              <HomePage />
            </div>
          ) : nghia === "collection" && admin ? (
            <div className="col-span-5 px-10 ">
              <Collection />
            </div>
          ) : nghia === "caidat" && login ? (
            <div className="col-span-5 px-10 ">
              <Setting />
            </div>
          ) : nghia === "donhang" ? (
            <div className="col-span-5 px-10 ">
              <Cart />
            </div>
          ) : nghia === "xemsanpham" && admin ? (
            <div className="col-span-5 px-10 ">
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

export default Dashboard;
