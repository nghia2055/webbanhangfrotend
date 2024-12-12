"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import Cart from "../page";

function Checkout() {
  const [numbderPhone, setNumberPhone] = useState("");
  const [modal, setModal] = useState(true);
  const [reduce, setReduce] = useState<number>(0);

  const handleNumber = (e: any) => {
    setNumberPhone(e.target.value);
  };
  const handleCheck = () => {
    const check = numbderPhone.replace(/\D/g, "");

    if (Number(check.length) === Number(10)) {
      setModal(true);
    } else setModal(false);
  };

  const reducePay = (data: number) => {
    setReduce(data);
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
          <Cart pad={"pt-0"} hidden={true} reducePay={reducePay} />
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
