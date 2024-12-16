"use client";
import Footer from "@/app/component/header/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { add, amount } from "../../redux/slice/sliceaddproduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { throttle } from "lodash";
import { useRouter } from "next/navigation";

type data = {
  collection: string;
  _id: string;
  createdAt: string;
  description: string;
  price: number;
  productImages: string[];
  productName: string;
  size: Array<"XL" | "L" | string>;
};

function ProductItem({ productsItemsData }: { productsItemsData: data }) {
  const addProduct = useSelector(
    (state: RootState) => state.addproduct.product
  );
  const imageRef = useRef<HTMLImageElement | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState(productsItemsData.productImages[0]);
  const [size, setSize] = useState(productsItemsData.size[0]);

  const handlePicture = (item: string) => {
    setImage(item);
  };

  const handleSize = (item: string) => {
    setSize(item);
  };

  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent) => {
      const container = e.currentTarget;
      const image = imageRef.current;

      if (!image) return;
      const rect = container.getBoundingClientRect();

      // Tính toán vị trí con trỏ trong container (theo phần trăm)
      const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

      // Dịch chuyển ảnh theo vị trí chuột (giới hạn trong khoảng 25% - 75%)
      image.style.transform = `translate(-${Math.min(
        Math.max(xPercent, 25),
        75
      )}%, -${Math.min(Math.max(yPercent, 25), 75)}%) scale(1.5)`;
    }, 16), // Giới hạn tần suất gọi hàm (16ms = 60 FPS)
    []
  );

  const handleMouseLeave = () => {
    const image = imageRef.current;

    if (image) {
      // Reset vị trí ảnh về giữa và scale lại như cũ
      image.style.transform = "translate(-50%, -50%) scale(1)";
    }
  };
  const handleAddProduct = (id: string) => {
    if (addProduct.length > 0) {
      const check = addProduct.some((item) => id === item._id);
      if (check) {
        dispatch(amount(id));
        return;
      }
    }
    dispatch(add({ ...productsItemsData, size: size, amount: 1 }));
  };

  return (
    <>
      <div className="grid grid-cols-11 pt-[200px] px-7">
        <div className="col-span-1">
          <div className="flex flex-col space-y-3">
            {productsItemsData.productImages.map(
              (item: string, index: number) => {
                return (
                  <Image
                    onClick={() => {
                      handlePicture(item);
                    }}
                    key={`index: ${index}`}
                    src={item}
                    width={80}
                    height={80}
                    alt="nghia"
                    className="border-2 cursor-pointer hover:border-red-700"
                  />
                );
              }
            )}
          </div>
        </div>
        <div
          className="col-span-5 overflow-hidden relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={image}
            width={1400} // Kích thước lớn hơn container
            height={1000}
            alt="Zoomable Image"
            ref={imageRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-zoom-in transition-transform duration-200 ease-out"
          />
        </div>
        <div className="col-span-5 px-7 space-y-4">
          <h1 className="font-bold text-xl">{productsItemsData.productName}</h1>
          <div className="flex gap-x-10 justify-between items-center pb-10 border-b-2 pt-5">
            <span className="border-r-2 w-48 font-bold text-red-600 text-xl">
              {String(productsItemsData.price).replace(
                /\B(?=(\d{3})+(?!\d))/g,
                "."
              )}
              <sup>₫</sup>
            </span>
            <span className="">
              <span>icon</span>
              <span> Kho hàng: Còn hàng </span>
              <p>Điểm thưởng: 18900</p>
              <p>Mã sản phẩm: MSP302</p>
            </span>
            <span className="flex-grow text-end">anh</span>
          </div>
          <div>
            <p className="mb-2">Chọn Size</p>
            <div className="flex">
              {productsItemsData.size.map((item: string, index: number) => {
                return (
                  <div
                    onClick={() => {
                      handleSize(item);
                    }}
                    key={`index:${index}`}
                    className={
                      size === item
                        ? "border-2 mr-3 w-8 text-center cursor-pointer bg-nav"
                        : "border-2 mr-3 w-8 text-center cursor-pointer hover:bg-nav"
                    }
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-end">Hotline: 0707686606 </p>
          <div>
            <Button
              onClick={() => {
                handleAddProduct(productsItemsData._id);
              }}
              variant={"destructive"}
              className="w-1/2 h-12 rounded-none"
            >
              THÊM VÀO GIỎ
            </Button>
            <Button
              className="w-1/2 h-12 rounded-none"
              onClick={() => {
                handleAddProduct(productsItemsData._id);
                router.push("/cart/checkout");
              }}
            >
              MUA HÀNG NGAY
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-10 pt-24 px-5 gap-y-10">
        <div>
          <span className="text-2xl font-bold block mb-10">Mô Tả Sản Phẩm</span>
          <p>{productsItemsData.description}</p>
        </div>

        {productsItemsData.productImages.map((item: string, index: number) => {
          return (
            <div key={`index: ${index}`}>
              <Image
                src={item}
                width={736}
                height={736}
                alt="nghia"
                className="border-2"
              />
            </div>
          );
        })}
        <div className="space-y-5">
          <div className="space-y-4">
            <span className="text-red-800 font-bold">* Nghĩa cam kết:</span>
            <p>
              - Myshoes.vn miễn phí giao hàng toàn quốc (với đơn hàng từ 500.000
              vnđ).
            </p>
            <p>
              - Đổi hàng trong 30 ngày. (Áp dụng với sản phẩm chưa sử dụng,
              nguyên vẹn như khi nhận hàng)
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-red-800 font-bold">
              * Cách thức mua hàng:
            </span>
            <br />
            <p>
              - Khách hàng MUA HÀNG trên website hoặc gọi điện tới Hotline:
              0707.686.606 để được tư vấn.
            </p>
            <p>
              - Khách hàng sẽ nhận được sản phẩm sau 1 - 3 ngày kể từ khi đặt
              hàng.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-red-800 font-bold">
              * Thông tin liên hệ Nghĩa:
            </span>
            <br />
            <p>+ Showroom: Sao Hoả.</p>
            <p>
              + Điện thoại: 0707.686.606 / Hotline: 0707.686.606 (Zalo, Viber)
            </p>
            <p>+ Email: dtn04999@gmail.com</p>
            <p>+ Website: nghia</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-x-11 px-5 mb-10">
        <div>
          <span className="font-bold mb-10 block">XEM ĐÁNH GIÁ</span>
          <br />
          <span>Không có đánh giá cho sản phẩm này.</span>
          <div>
            <input
              placeholder="Tên bạn"
              className="w-full outline-none border-2"
            />

            <textarea
              placeholder="Đánh giá của bạn"
              className="w-full outline-none border-2 mt-2 resize-none p-2 h-36"
            ></textarea>
          </div>
        </div>
        <div className=" mt-36">
          <span>
            <span className="text-red-500">Lưu ý:</span> không hỗ trợ HTML!
          </span>
          <br />
          <span className="space-x-4 mt-5 block">
            <span>Xấu</span>
            <input type="radio" name="nghĩa" value="1 sao" />
            <input type="radio" name="nghĩa" value="2 sao" />
            <input type="radio" name="nghĩa" value="3 sao" />
            <input type="radio" name="nghĩa" value="4 sao" />
            <input type="radio" name="nghĩa" value="5 sao" />
            <span>Tốt</span>
          </span>
          <Button variant="destructive" className="w-full mt-10">
            Tiếp tục
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default ProductItem;
