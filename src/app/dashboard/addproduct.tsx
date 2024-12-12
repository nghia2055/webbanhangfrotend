"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection } from "@/app/redux/slice/collection";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { toast } from "sonner";
import { AppDispatch } from "@/app/redux/store";

// Schema validate bằng Zod
const schema = z.object({
  productName: z
    .string()
    .min(3, { message: "Tên sản phẩm phải có ít nhất 3 ký tự" }),
  price: z.string().refine((value) => /^\d+$/.test(value.replace(/\./g, "")), {
    message: "Giá phải là một số hợp lệ",
  }),
  collection: z.string().nonempty("Bạn chưa chọn danh mục"),
  subCollection: z.string(),
  options: z.string(),
  size: z
    .array(z.enum(["S", "M", "L", "XL"]))
    .min(1, { message: "Vui lòng chọn ít nhất một kích cỡ" }),
  description: z
    .string()
    .min(10, { message: "Mô tả phải có ít nhất 10 ký tự" }),
  productImages: z
    .any()
    .refine(
      (files: FileList | undefined) =>
        files &&
        Array.from(files).every((file) =>
          ["image/png", "image/jpeg"].includes(file.type)
        ),
      { message: "Tất cả các file phải là ảnh PNG hoặc JPEG" }
    )
    .refine(
      (files) =>
        files &&
        Array.from(files).every(
          (file) => (file as File).size <= 2 * 1024 * 1024
        ),
      { message: "Mỗi ảnh phải nhỏ hơn 2MB" }
    ),
});

type FormValues = z.infer<typeof schema>;

const ProductForm: React.FC = () => {
  const [formattedPrice, setFormattedPrice] = useState(""); // Giá trị hiển thị
  const [picture, setPicture] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      productName: "", // Giá trị mặc định là rỗng
      price: "",
      collection: "",
      subCollection: "",
      options: "",
      size: [],
      description: "",
      productImages: [],
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("price", data.price.replace(/\./g, ""));
    formData.append("collection", data.collection);
    formData.append("subCollection", data.subCollection);
    formData.append("options", data.options);
    formData.append("size", JSON.stringify(data.size));
    formData.append("description", data.description);

    for (let i = 0; i < picture.length; i++) {
      formData.append("productImages", picture[i]);
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/addProduct`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((respone) => respone.json())
      .then(() => {
        toast("Đăng sản phẩm thành công", {
          action: {
            label: "✖", // Biểu tượng nút đóng
            onClick: () => toast.dismiss(), // Đóng Toast
          },
        });
        setFormattedPrice("");
        reset();
        setPicture([]);
      })
      .catch(() =>
        toast("Đăng sản phẩm không thành công", {
          action: {
            label: "✖", // Biểu tượng nút đóng
            onClick: () => toast.dismiss(), // Đóng Toast
          },
        })
      );
  };

  const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pic: File[] = [];
    const files = e.target.files;
    if (files) {
      Array.from(files).map((item: File) => {
        const isDuplicate = picture.some((data) => data.name === item.name);

        if (!isDuplicate) {
          pic.push(item);
        }
      });
      const updatedPictures = [...picture, ...pic];
      setPicture(updatedPictures);
      setValue("productImages", updatedPictures); // Array.from(files) chỉ được gọi nếu files != null
    }
  };

  // Hàm định dạng giá trị tiền tệ
  const formatCurrency = (value: string): string => {
    return value
      .replace(/\D/g, "") // Loại bỏ ký tự không phải số
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu chấm sau mỗi 3 chữ số
  };

  // Xử lý thay đổi giá trị trường giá
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, ""); // Loại bỏ dấu chấm
    setFormattedPrice(formatCurrency(rawValue)); // Định dạng lại giá trị hiển thị
    setValue("price", rawValue, { shouldValidate: true }); // Cập nhật giá trị thực vào form
  };

  type SubCollectionType = {
    name: string;
    options: string[];
  };

  type Category = {
    name: string;
    SubCollection?: SubCollectionType[];
  };
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchAPIMenu = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/add`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resjson = await res.json();
        setCategories(resjson.Menucollection);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPIMenu();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const subCategories =
    categories.find((item) => item.name === selectedCategory)?.SubCollection ||
    [];

  const options =
    subCategories.find((item) => item.name === selectedSubCategory)?.options ||
    [];

  const dispatch = useDispatch<AppDispatch>();

  const handleCollection = () => {
    dispatch(collection("collection"));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">Đăng Sản Phẩm</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tên sản phẩm */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tên sản phẩm
          </label>
          <input
            type="text"
            {...register("productName")}
            className={`mt-1 p-3 border rounded-lg w-full ${
              errors.productName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập tên sản phẩm"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.productName.message}
            </p>
          )}
        </div>

        {/* Giá */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Giá (VNĐ)
          </label>
          <input
            {...register("price")}
            type="text"
            value={formattedPrice}
            onChange={handlePriceChange}
            className={`mt-1 p-3 border rounded-lg w-full ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập giá sản phẩm"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-2">{errors.price.message}</p>
          )}
        </div>

        {/* category
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Chọn danh mục:
          </label>
          <select
            id="category"
            {...register("category", { required: true })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="Giày Adidas">Giày Adidas</option>
            <option value="Giày Puma">Giày Puma</option>
            <option value="Giày Thể Thao">Giày Thể Thao</option>
          </select>

          {errors.category && (
            <p className="mt-2 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div> */}

        {/* option */}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Danh mục chính:
          </label>
          <select
            {...register("collection")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            onChange={(e) => {
              setValue("collection", e.target.value);
              setSelectedCategory(e.target.value);
              setSelectedSubCategory("");
            }}
          >
            <option value="">-- Chọn danh mục chính --</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.collection && (
            <p className="text-red-500 text-sm mt-2">
              {errors.collection.message}.{"  "}
              <span
                className="underline cursor-pointer"
                onClick={handleCollection}
              >
                Hãy tạo ngay
              </span>
            </p>
          )}
        </div>

        {/* Chọn danh mục con */}
        {subCategories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Danh mục con:
            </label>
            <select
              {...register("subCollection")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              onChange={(e) => {
                setValue("subCollection", e.target.value);

                setSelectedSubCategory(e.target.value);
              }}
            >
              <option value="">-- Chọn danh mục con --</option>
              {subCategories.map((sub) => (
                <option key={sub.name} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Chọn tùy chọn */}
        {options.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tùy chọn:
            </label>
            <select
              {...register("options")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              onChange={(e) => {
                setValue("options", e.target.value);
              }}
            >
              <option value="">-- Chọn tùy chọn --</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kích cỡ (Chọn ít nhất một)
          </label>
          <div className="flex space-x-6 mt-2">
            {["S", "M", "L", "XL"].map((size) => (
              <div key={size} className="flex items-center">
                <input
                  type="checkbox"
                  id={size}
                  value={size}
                  {...register("size")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={size} className="ml-2 text-sm text-gray-700">
                  {size}
                </label>
              </div>
            ))}
          </div>
          {errors.size && (
            <p className="text-red-500 text-sm mt-2">{errors.size.message}</p>
          )}
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <textarea
            {...register("description")}
            className={`mt-1 p-3 border rounded-lg w-full ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Mô tả sản phẩm"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Ảnh sản phẩm */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ảnh sản phẩm (chọn nhiều ảnh)
          </label>
          <input
            type="file"
            {...register("productImages")}
            onChange={handlePicture}
            multiple
            className={`mt-1 p-3 border rounded-lg w-full ${
              errors.productImages ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.productImages && (
            <p className="text-red-500 text-sm mt-2">Có lỗi xảy ra</p>
          )}
        </div>

        {/* Hiển thị ảnh preview */}
        {picture && picture.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {picture.map((file, index) => (
              <div className="relative" key={index}>
                <Image
                  height={500}
                  width={500}
                  key={index}
                  src={URL.createObjectURL(file as File)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover border rounded-lg"
                />
                <span
                  onClick={() => {
                    const pic = [...picture];
                    pic.splice(index, 1);
                    setPicture(pic);
                  }}
                  className="absolute top-1/2 right-1/2 text-red-700 font-bold -translate-y-1/2 translate-x-1/2 cursor-pointer "
                >
                  XÓA
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Đăng sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
