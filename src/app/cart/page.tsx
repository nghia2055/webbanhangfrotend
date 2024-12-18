"use client";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Image from "next/image";
import { useMemo } from "react";
import { remove } from "../redux/slice/sliceaddproduct";
import { useRouter } from "next/navigation";

type Data = {
  collection: string;
  _id: string;
  createdAt: string;
  description: string;
  price: number;
  productImages: string[];
  productName: string;
  size: string;
  amount: number;
};
export const dynamic = "force-dynamic";

function Page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((item: RootState) => item.addproduct.product);
  const reduce = useMemo(() => {
    return data.reduce((initialState, item) => {
      return initialState + item.price * item.amount;
    }, 0);
  }, [data]);

  const handleRemove = (item: string) => {
    dispatch(remove(item));
  };
  const handlePay = () => {
    router.push("/cart/checkout");
  };

  return (
    <>
      <div className="px-4 flex pt-[200px] mb-10 flex-col w-full overflow-x-scroll">
        <div className=" flex flex-col w-[700px] mx-auto">
          <div className="font-bold text-lg">Giỏ Hàng Của Bạn</div>
          <br />
          <div className=" text-center border-b-2 border-l-2 border-t-2 border-r-2 place-items-center flex">
            <div className="w-32 shrink-0">
              <span>Hình ảnh</span>
            </div>
            <div className="w-32 shrink-0">
              <span>Tên sản phẩm</span>
            </div>
            <div className="w-32 shrink-0">
              <span>Mã hàng</span>
            </div>
            <div className="w-32 shrink-0">
              <span>Số lượng</span>
            </div>
            <div className="w-32 shrink-0">
              <span>Đơn giá</span>
            </div>
          </div>
          {data.map((item: Data, index: number) => {
            return (
              <div
                className="flex-grow text-center border-b-2 border-l-2 border-r-2 place-items-center flex overflow-x-scroll md:overflow-hidden "
                key={`index-${index}`}
              >
                <div className=" flex justify-center py-2 w-32 shrink-0 ">
                  <Image
                    src={item.productImages[0]}
                    width={70}
                    height={70}
                    alt=""
                  />
                </div>
                <div className="w-32 shrink-0">
                  <div className="line-clamp-2 break-all">
                    <p>{item.productName}</p>
                    <span>Chọn size: {item.size} </span>
                  </div>
                </div>
                <div className="col-span-2 space-y-3 w-32 shrink-0">
                  <div>MSN{item._id.slice(19)}</div>
                  <div
                    className="text-red-500 text-xs cursor-pointer font-bold"
                    onClick={() => {
                      handleRemove(item._id);
                    }}
                  >
                    Xóa
                  </div>
                </div>
                <div className=" w-32 shrink-0">
                  <span>{item.amount}</span>
                </div>

                <div className="w-32 shrink-0">
                  <span>
                    Tổng cộng:{" "}
                    {String(item.price * item.amount).replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={` flex flex-col items-center w-[700px] mx-auto text-center flex-grow border-2 mb-10 p-2 h-48`}
        >
          <div className="border-2 w-full md:w-2/3 p-2 mt-10 text-start">
            Tổng: {String(reduce).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <Button className="w-full mt-11" onClick={handlePay}>
            THANH TOÁN
          </Button>
        </div>
      </div>
    </>
  );
}

export default Page;
