"use client";

import Tippy from "@tippyjs/react/headless";
import Image from "next/image";
import { FaBagShopping, FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useState } from "react";
import Link from "next/link";
import { remove } from "@/app/redux/slice/sliceaddproduct";
import { addamount, minusamount } from "@/app/redux/slice/sliceaddproduct";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [openTippy, setOpenTippy] = useState(false);
  const Cart = useSelector((item: RootState) => item.addproduct.product);

  const amount = Cart.reduce((initial, item) => {
    return item.amount + initial;
  }, 0);

  const pay = Cart.reduce((initial, item) => {
    return item.price * item.amount + initial;
  }, 0);

  const handleRemove = (item: string) => {
    dispatch(remove(item));
  };

  const handleAddAmount = (item: string) => {
    dispatch(addamount(item));
  };
  const minusAmount = (item: string) => {
    dispatch(minusamount(item));
  };

  const handleViewCart = () => {
    router.push("/cart");
  };

  const handlePay = () => {
    router.push("/cart/checkout");
  };
  return (
    <Tippy
      onClickOutside={() => {
        setOpenTippy(false);
      }}
      visible={openTippy}
      placement="top-end"
      interactive
      render={(attrs) => (
        <div
          className="box border-2 rounded-xl shadow-2xl"
          tabIndex={-1}
          {...attrs}
        >
          <div className="w-[500px] h-[450px] shadow-xl bg-white rounded-xl">
            {Cart.length === 0 ? (
              <div className="w-full h-full flex-col flex justify-center items-center space-y-11">
                <span className="font-bold text-2xl text-red-400">
                  Không có sản phẩm trong giỏ hàng!
                </span>
                <FaCartShopping className="text-2xl w-[100px] h-[100px] text-nav" />
              </div>
            ) : (
              <>
                <div className="h-72 bg-white overflow-auto rounded-xl">
                  {Cart.map((item, index) => {
                    return (
                      <div
                        className="grid grid-cols-7 px-1 items-center gap-x-2 pb-2 border-b-2  rounded-xl"
                        key={`index-${index}`}
                      >
                        <div>
                          <Image
                            src={item.productImages[2]}
                            width={200}
                            height={300}
                            alt="pic"
                          />
                        </div>
                        <div className="col-span-3">
                          <Link
                            href={`/collection/${item.collection}/${item._id}`}
                          >
                            <span className="text-sm font-thin text-blue-500">
                              {item.productName}
                            </span>
                          </Link>
                          <br />
                          <span className="text-sm">
                            {" "}
                            Chọn size: {item.size}
                          </span>
                        </div>
                        <span className="text-center space-x-2">
                          <span
                            className="text-red-600 text-xl cursor-pointer rounded-lg border-[1px] select-none"
                            onClick={() => {
                              minusAmount(item._id);
                            }}
                          >
                            -
                          </span>
                          <span className="text-md">x{item.amount}</span>
                          <span
                            className="text-red-600 text-xl cursor-pointer border-[1px] select-none"
                            onClick={() => handleAddAmount(item._id)}
                          >
                            +
                          </span>
                        </span>
                        <span className="col-span-2 text-center">
                          {String(item.price * item.amount).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            "."
                          )}{" "}
                          <span
                            className="text-red-700 font-bold ml-2 cursor-pointer select-none"
                            onClick={() => {
                              handleRemove(item._id);
                            }}
                          >
                            X
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 w-full">
                  <div className="flex justify-between border-2 px-4">
                    <span className="font-bold text-red-700">Thành tiền: </span>
                    <span className="font-bold ">
                      {String(pay).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                    </span>
                  </div>
                  <br />
                  <div className="border-2 flex justify-between px-4">
                    <span className="font-bold text-red-700">Tổng: </span>
                    <span className="font-bold">
                      {String(pay).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                    </span>
                  </div>
                </div>
                <div className="px-20 flex mt-3 justify-between">
                  <Button
                    className="bg-black hover:bg-opacity-70"
                    onClick={handleViewCart}
                  >
                    XEM GIỎ HÀNG
                  </Button>
                  <Button
                    onClick={handlePay}
                    variant="default"
                    className="bg-red-400 hover:bg-red-400 hover:bg-opacity-70"
                  >
                    THANH TOÁN
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    >
      <div
        className="relative"
        onClick={() => {
          setOpenTippy(!openTippy);
        }}
      >
        <FaBagShopping className="w-[60px] h-[60px] cursor-pointer px-4 " />
        <span className="absolute top-0 right-0 bg-red-500  rounded-full w-6 h-6 text-center flex items-center justify-center text-white select-none">
          {amount}
        </span>
      </div>
    </Tippy>
  );
}

export default Cart;
