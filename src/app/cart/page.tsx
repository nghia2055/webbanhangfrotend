"use client";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { remove } from "../redux/slice/sliceaddproduct";
import { useRouter } from "next/navigation";

function Cart({
  pad,
  hidden,
  reducePay,
}: {
  pad: string;
  hidden: boolean;
  reducePay: (data: number) => void;
}) {
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

  useEffect(() => {
    if (reducePay) {
      reducePay(reduce);
    }
  }, [reduce, reducePay]); // Gọi reducePay sau khi tính toán reduce
  return (
    <>
      <div
        className={pad ? `px-4 flex mb-10 ${pad}` : `px-4 flex pt-[200] mb-10`}
      >
        <div className={hidden ? "w-full" : ` w-4/5`}>
          <div className="font-bold text-lg">Giỏ Hàng Của Bạn</div>
          <br />
          <div className="grid grid-cols-15 flex-grow text-center border-2">
            <div className="col-span-2">
              <span>Hình ảnh</span>
              {/* <p>ảnh</p> */}
            </div>
            <div className="col-span-4">
              <span>Tên sản phẩm</span>
              {/* <div>
                <p>Giày</p>
                <span>Chọn size: </span>
                <span>Điểm thưởng: </span>
              </div> */}
            </div>
            <div className="col-span-2">
              <span>Mã hàng</span>
            </div>
            <div className="col-span-3">
              <span>Số lượng</span>
            </div>
            <div className="col-span-2">
              <span>Đơn giá</span>
            </div>
            <div className="col-span-2">
              <span>Tổng cộng</span>
            </div>
          </div>
          {data.map((item: any, index: number) => {
            return (
              <div
                className="grid grid-cols-15 flex-grow text-center border-b-2 border-l-2 border-r-2 place-items-center "
                key={`index-${index}`}
              >
                <div className="col-span-2 flex justify-center py-2">
                  <Image
                    src={item.productImages[0]}
                    width={70}
                    height={70}
                    alt=""
                  />
                </div>
                <div className="col-span-4">
                  <div>
                    <p>{item.productName}</p>
                    <span>Chọn size: {item.size} </span>
                  </div>
                </div>
                <div className="col-span-2 space-y-3">
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
                <div className="col-span-3">
                  <span>{item.amount}</span>
                </div>
                <div className="col-span-2">
                  <span>
                    {String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </div>
                <div className="col-span-2">
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
          className={
            hidden
              ? "hidden"
              : `ml-10 flex flex-col items-center text-center flex-grow border-2 mb-10 p-2 h-48`
          }
        >
          <div className="border-2 w-2/3 p-2 mt-10 text-start">
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

export default Cart;
