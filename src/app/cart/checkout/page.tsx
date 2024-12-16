"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import Image from "next/image";
import { remove } from "@/app/redux/slice/sliceaddproduct";
import { toast } from "sonner";

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

function Page() {
  const provinces = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];
  const [numberPhone, setNumberPhone] = useState("");
  const [modal, setModal] = useState(true);
  const [pay, setPay] = useState("thanhtoankhinhanhang");
  const [methodPay, setMethodPay] = useState("mienphigiaohang");
  const [Address, setAddress] = useState("");
  const [AddressAll, setAddressAll] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberPhone(e.target.value);
  };
  const handleCheck = () => {
    const check = numberPhone.replace(/\D/g, "");

    if (Number(check.length) === Number(10)) {
      setModal(true);
    } else {
      setModal(false);
    }
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

  const handlePay = (e: ChangeEvent<HTMLInputElement>) => {
    setPay(e.target.value);
  };
  const handleConfirm = () => {
    const check = numberPhone.replace(/\D/g, "");

    if (
      Number(check.length) === Number(10) &&
      Address &&
      AddressAll.length >= 20 &&
      Address
    ) {
      const form = new FormData();
      form.append("number", numberPhone);
      form.append("city", Address);
      form.append("address", AddressAll);
      form.append("ship", methodPay);
      form.append("methodPay", pay);
      const product = data.map((item) => {
        return {
          _id: item._id,
          name: item.productName,
          amount: item.amount,
          size: item.size,
          price: item.price,
          productImages: item.productImages[3],
        };
      });

      form.append("product", JSON.stringify(product));

      fetch(`${process.env.NEXT_PUBLIC_URL}/order`, {
        credentials: "include",
        method: "POST",
        body: form,
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Something went wrong!");
          }
        })
        .then((result) => {
          // Kiểm tra xem result có phải là đối tượng hay không
          if (result && result.message) {
            toast(result.message); // Hiển thị thông điệp từ result.message
          } else {
            toast("Đặt hàng thành công!"); // Mặc định nếu không có message
          }
          setNumberPhone("");
          setAddress("");
          setAddressAll("");
        })
        .catch((err) => {
          toast("Đặt hàng không thành công");
          console.log("Error:", err);
        });
      setModal(true);
    } else {
      if (Number(check.length) === Number(10)) {
        setModal(true);
      } else {
        setModal(false);
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleMethodPay = (e: ChangeEvent<HTMLInputElement>) => {
    setMethodPay(e.target.value);
  };
  const handleAddress = (e: ChangeEvent<HTMLSelectElement>) => {
    setAddress(e.target.value);
  };

  const handleAddressAll = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressAll(e.target.value);
  };
  return (
    <div className="pt-[200px] flex gap-x-10 mb-20 px-4 ">
      <div className="w-1/3  ">
        <div className="flex flex-col justify-center text-center space-y-6 border-2 h-60  ">
          <span className="font-bold">Nhập thông tin khách hàng</span>
          <div>
            <input
              className="border-2 mr-2 h-10 pl-2"
              onChange={handleNumber}
              placeholder="Số điện thoại"
              value={numberPhone.replace(/\D/g, "")}
            />
            <Button onClick={handleCheck}>Tiếp Tục</Button>
          </div>
          {modal ? (
            ""
          ) : (
            <div className="text-red-500">
              Lỗi: Số điện thoại phải gồm đúng 10 chữ số
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col border-2 p-3 space-y-3">
          <span>ĐỊA CHỈ GIAO HÀNG</span>
          <input
            value={AddressAll}
            className="border-2 mr-2 h-10 pl-2"
            placeholder="Địa chỉ"
            onChange={handleAddressAll}
          />
          {AddressAll.length < 20 && (
            <div className="text-red-500">
              Bạn hãy nhập địa chỉ tối thiểu 20 kí tự
            </div>
          )}
          <select
            className="border-2"
            onChange={handleAddress}
            value={Address || ""}
          >
            <option value="">-- Chọn tỉnh/thành phố --</option>
            {provinces.map((item, key) => {
              return (
                <option key={key} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          {!Address && (
            <div className="text-red-500">Vui lòng chọn tỉnh/thành</div>
          )}
        </div>
      </div>

      <div className="w-full space-y-9 ">
        <div className="flex justify-around border-2">
          <div>
            <span>PHƯƠNG THỨC GIAO HÀNG</span>
            <div>
              <input
                value="mienphigiaohang"
                type="radio"
                name="giaohang"
                onChange={handleMethodPay}
                checked={methodPay === "mienphigiaohang" ? true : false}
              />
              <span>Miễn phí giao hàng - 0đ</span>
            </div>

            <div>
              <input
                value="shipnhanh"
                type="radio"
                name="giaohang"
                onChange={handleMethodPay}
                checked={methodPay === "shipnhanh" ? true : false}
              />
              <span>Ship nhanh - 25.000đ</span>
            </div>
          </div>
          <div>
            <span>PHƯƠNG THỨC THANH TOÁN</span>
            <div>
              <input
                checked={pay === "thanhtoankhinhanhang" ? true : false}
                type="radio"
                name="thanhtoan"
                onChange={handlePay}
                value="thanhtoankhinhanhang"
              />
              <span>Thanh toán khi nhận hàng</span>
            </div>

            <div>
              <input
                checked={pay === "chuyenkhoannganhang" ? true : false}
                type="radio"
                name="thanhtoan"
                onChange={handlePay}
                value="chuyenkhoannganhang"
              />
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
        {pay === "chuyenkhoannganhang" && (
          <div className="border-2 space-y-4 p-10">
            <h1 className="text-xl">Chi tiết thanh toán</h1>
            <div className="space-y-5">
              <p className="font-bold mb-2">Thông tin chuyển khoản</p>
              <span className="font-bold">
                Bạn vui lòng chuyển đủ số tiền vào tài khoản sau:
              </span>
              <div className="flex flex-col">
                <span>Ngân hàng Vietinbank</span>
                <span>- Số tài khoản: 103868711433</span>
                <span>- Chủ tài khoản: Đoàn Trọng Nghĩa</span>
                <span>- Chi nhánh: Sao Hỏa</span>
                <span className="mt-2">
                  Sau khi nhận được tiền Shop Nghĩa sẽ chuyển hàng ngay cho bạn.
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="text-center">
          <Button
            variant={"destructive"}
            className="text-center text-2xl"
            onClick={handleConfirm}
          >
            Xác Nhận
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
