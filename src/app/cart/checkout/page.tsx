"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import Image from "next/image";
import { remove } from "@/app/redux/slice/sliceaddproduct";

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

function Checkout() {
  const [numbderPhone, setNumberPhone] = useState("");
  const [modal, setModal] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberPhone(e.target.value);
  };
  const handleCheck = () => {
    const check = numbderPhone.replace(/\D/g, "");

    if (Number(check.length) === Number(10)) {
      setModal(true);
    } else setModal(false);
  };

  const data = useSelector((item: RootState) => item.addproduct.product);
  const reduce = useMemo(() => {
    return data.reduce((initialState, item) => {
      return initialState + item.price * item.amount;
    }, 0);
  }, [data]);

  const handleRemove = (item: string) => {
    dispatch(remove(item));
  };
  return (
    <div className="pt-[200] flex gap-x-10 mb-20 px-4 ">
      <div className="w-1/3  ">
        <div className="flex flex-col justify-center text-center space-y-6 border-2 h-60  ">
          <span className="font-bold">Nhập thông tin khách hàng</span>
          <div>
            <input
              className="border-2 mr-2 h-10 pl-2"
              onChange={handleNumber}
              placeholder="Số điện thoại"
              value={numbderPhone.replace(/\D/g, "")}
            />
            <Button onClick={handleCheck}>Tiếp Tục</Button>
          </div>
          {modal ? "" : <div>Lỗi: Số điện thoại phải gồm đúng 10 chữ số</div>}
        </div>

        <div className="mt-8 flex flex-col border-2 p-3 space-y-3">
          <span>ĐỊA CHỈ GIAO HÀNG</span>
          <input className="border-2 mr-2 h-10 pl-2" placeholder="Địa chỉ" />
        </div>
      </div>

      <div className="w-full space-y-9 ">
        <div className="flex justify-around border-2">
          <div>
            <span>PHƯƠNG THỨC GIAO HÀNG</span>
            <div>
              <input type="radio" name="giaohang" />
              <span>Miễn phí giao hàng - 0đ</span>
            </div>

            <div>
              <input type="radio" name="giaohang" />
              <span>Ship nhanh - 25.000đ</span>
            </div>
          </div>
          <div>
            <span>PHƯƠNG THỨC THANH TOÁN</span>
            <div>
              <input type="radio" name="nhanhang" />
              <span>Thanh toán khi nhận hàng</span>
            </div>

            <div>
              <input type="radio" name="nhanhang" />
              <span>Chuyển khoản ngân hàng</span>
            </div>
          </div>
        </div>
        <div className="p-8 border-2">
          <input
            placeholder="Nhập mã giảm giá nếu có"
            className="border-2 w-full h-10 pl-2"
          />
        </div>
        <div className="p-8 border-2">
          <>
            <div className={`px-4 flex mb-10`}>
              <div className={` w-full`}>
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
                {data.map((item: Data, index: number) => {
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
                          {String(item.price).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
          <div>
            Tổng tiền: {String(reduce).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          </div>
        </div>
        <div className="text-center">
          <Button variant={"destructive"} className="text-center text-2xl">
            Xác Nhận
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
