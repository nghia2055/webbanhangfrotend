"use client";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa6";
import { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type data = {
  collection: string;
  _id: string;
  createdAt: string;
  description: string;
  price: number;
  productImages: string[];
  productName: string;
  size: Array<"XL" | "L" | string>;
  subCollection: string;
};

type sub = {
  id: string;
  subCollection: string;
};

function FilterProduct({
  Subcollection = [],
}: {
  productsData: data[];
  Subcollection: sub[];
}) {
  const router = useRouter();
  const Size = ["S", "M", "L", "XL"];

  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");
  const [size, setSize] = useState<string | null>("");
  const [selectedSubCollection, setSelectedSubCollection] = useState<
    string | null
  >("");
  const formatToDisplay = (value: string) => {
    // Loại bỏ tất cả ký tự không phải số và định dạng tiền Việt
    const numericValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${numericValue}`; // Định dạng tiền
  };

  // Khi người dùng nhập vào input Min
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "").replace(/^0+/, ""); // Loại bỏ ký tự không phải số
    setMinValue(input); // Cập nhật giá trị gốc không định dạng
  };

  // Khi người dùng nhập vào input Max
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "").replace(/^0+/, ""); // Loại bỏ ký tự không phải số
    setMaxValue(input); // Cập nhật giá trị gốc không định dạng
  };

  const handleClick = (checkbox: HTMLInputElement) => {
    const selectedValue = checkbox.checked ? checkbox.value : null;

    // Cập nhật query params
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      if (selectedValue) {
        queryParams.set(checkbox.name, selectedValue);
      } else {
        queryParams.delete(checkbox.name);
      }

      // Đẩy URL mới vào router
      const path = `${window.location.pathname}?${queryParams.toString()}`;
      router.push(path);
    }
  };

  const handleSize = (size: HTMLInputElement) => {
    const selectedValue = size.checked ? size.value : null;

    // Cập nhật query params
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      if (selectedValue) {
        queryParams.set(size.name, selectedValue);
      } else {
        queryParams.delete(size.name);
      }

      // Đẩy URL mới vào router
      const path = `${window.location.pathname}?${queryParams.toString()}`;
      router.push(path);
    }
  };

  const handlePrice = () => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has("min") && minValue) {
        queryParams.set("min", minValue);
      } else if (minValue) {
        queryParams.append("min", minValue);
      } else if (queryParams.has("min")) {
        queryParams.delete("min");
      }
      if (queryParams.has("max") && maxValue) {
        queryParams.set("max", maxValue);
      } else if (maxValue) {
        queryParams.append("max", maxValue);
      } else if (queryParams.has("max")) {
        queryParams.delete("max");
      }

      const path = `${window.location.pathname}?${queryParams.toString()}`;
      router.push(path);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const value = queryParams.get("sc") || "";
      const size = queryParams.get("size") || "";
      const minValue = queryParams.get("min") || "0";
      const maxValue = queryParams.get("max") || "0";

      setSelectedSubCollection(value);
      setSize(size);
      setMinValue(minValue);
      setMaxValue(maxValue);
    }
  }, []);

  return (
    <section className="col-span-1 space-y-6">
      <p className="flex justify-between">
        Tìm Kiếm Theo
        <span className="cursor-pointer rounded-full w-10 bg-nav text-center ">
          Xóa
        </span>
      </p>
      <div>
        <input type="checkbox" id="toggle-dropdown" className="peer hidden" />

        <label
          htmlFor="toggle-dropdown"
          className="flex justify-between border-b-[1px] pb-2 items-center cursor-pointer group"
        >
          <h1 className="font-bold group-hover:opacity-50">DANH MỤC</h1>
          <span className="text-xs text-red-500">
            <FaArrowDown />
          </span>
        </label>

        <div className="mt-3 space-y-1 max-h-[300] overflow-hidden transition-all duration-500 peer-checked:max-h-[0] peer-checked:overflow-ellipsis">
          {[...new Set(Subcollection.map((item) => item.subCollection))].map(
            (subCollection, index) => (
              <div className="flex" key={`index-${index}`}>
                <input
                  name="sc"
                  type="checkbox"
                  value={subCollection}
                  checked={selectedSubCollection === subCollection}
                  onChange={(e) => handleClick(e.target)}
                />
                <h2 className="ml-2">{subCollection}</h2>
              </div>
            )
          )}
        </div>
      </div>
      <div>
        <div className="border-b-[1px] pb-2 flex items-center">
          <h2 className=" font-bold hover:opacity-50">THƯƠNG HIỆU</h2>
          <span className="ml-auto text-xs text-red-500">
            <FaArrowDown />
          </span>
        </div>
        <Image
          src="/adidas-42x42w.png"
          className="border-2 mt-4 cursor-pointer"
          width={40}
          height={40}
          alt="size"
        />
      </div>
      <div>
        <span className="mb-4 block border-b-[1px] pb-2 font-bold hover:opacity-50">
          GIÁ
        </span>
        <div className="flex w-full space-x-5 items-center">
          <div className="flex flex-col gap-y-3">
            <div className="flex">
              <input
                placeholder="Min"
                className="w-full border-[1px] pl-2"
                value={formatToDisplay(minValue)}
                onChange={handleMinChange}
              />
              <span>đ</span>
            </div>
            <div className="flex">
              <input
                placeholder="Max"
                className="w-full border-[1px] pl-2"
                value={formatToDisplay(maxValue)}
                onChange={handleMaxChange}
              />
              <span>đ</span>
            </div>
          </div>
          <Button onClick={handlePrice}>Go</Button>
        </div>
      </div>
      <div>
        <h2 className="border-b-[1px] pb-2 font-bold hover:opacity-50">
          CHỌN SIZE
        </h2>
        <div>
          {Size.map((item: string, index: number) => {
            return (
              <div key={`index-${index}`} className="flex">
                <input
                  name="size"
                  type="checkbox"
                  value={item}
                  checked={item === size}
                  onChange={(e) => {
                    handleSize(e.target);
                  }}
                />
                <h2 className="ml-2">{item}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(FilterProduct);
