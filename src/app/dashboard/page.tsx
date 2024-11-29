"use client";
import { RootState } from "@/app/redux/store";
import { useEffect, useState } from "react";
import ProductForm from "./(dashboard)/addproduct/page";
import { useRouter } from "next/navigation";
import HomePage from "./(dashboard)/home/page";
import Collection from "./(dashboard)/collection/page";
import { useDispatch, useSelector } from "react-redux";
import { collection } from "../redux/slice/collection";

function Dashboard() {
  useEffect(() => {
    setItem("trangchu");
  }, []);
  const route = useRouter();
  const listDashboard = [
    { url: "trangchu", title: "Trang Chủ" },
    { url: "sanpham", title: "Sản Phẩm" },
    { url: "collection", title: "Collection" },
    { url: "donhang", title: "Đơn Hàng" },
    { url: "nguoidung", title: " Người Dùng" },
    { url: "caidat", title: " Cài Đặt" },
  ];
  const [item, setItem] = useState<string>("");

  const handleItemDashboard = (item: string) => {
    setItem(item);
  };

  const dispatch = useDispatch();

  const nghia: string = useSelector(
    (state: RootState) => state.collection.Collection
  );

  return (
    <div className="min-h-[1500] bg-nav bg-opacity-20">
      <div
        className="text-end pr-11 pt-10  "
        onClick={() => {
          route.push("/");
        }}
      >
        <span className="text-cyan-800 rounded-md text-5xl cursor-pointer">
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

          {nghia === "sanpham" ? (
            <div className="col-span-5 px-10 ">
              <ProductForm />
            </div>
          ) : nghia === "trangchu" ? (
            <div className="col-span-5 px-10 ">
              <HomePage />
            </div>
          ) : nghia === "collection" ? (
            <div className="col-span-5 px-10 ">
              <Collection />
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
