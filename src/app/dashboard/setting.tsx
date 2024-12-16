"use client";

import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Setting() {
  // Fetch user data from Redux store
  const data: { user: string; email: string } = useSelector(
    (item: RootState) => item.auth.user
  );

  // Define validation schema using Zod
  const formSchema = z
    .object({
      name: z.string().min(6, "Tên phải có ít nhất 6 ký tự"),
      email: z.string().email("Email không hợp lệ"),
      password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
      confirmpassword: z
        .string()
        .min(6, "Mật khẩu xác nhận phải có ít nhất 6 ký tự"),
    })
    .superRefine(({ confirmpassword, password }, ctx) => {
      if (confirmpassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "Mật khẩu không khớp",
          path: ["confirmpassword"], // Reference to the field with the error
        });
      }
    });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {};

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Thông Tin Người Dùng</h1>

        {/* Display User Info */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Tên:</span>
            <span>{data?.user || "Chưa có tên"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Email:</span>
            <span>{data?.email || "Chưa có email"}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
          {/* Update Name */}
          <div>
            <label className="block text-gray-600 font-medium">Tên</label>
            <input
              {...register("name")}
              type="text"
              name="name"
              placeholder="Cập nhật tên"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Update Email */}
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              name="email"
              placeholder="Cập nhật email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Update Password */}
          <div>
            <label className="block text-gray-600 font-medium">
              Nhập Mật Khẩu Cũ
            </label>
            <input
              {...register("password")}
              type="password"
              name="password"
              placeholder="Nhập mật khẩu cũ"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Update Confirm Password */}
          <div>
            <label className="block text-gray-600 font-medium">
              Nhập Mật Khẩu Mới
            </label>
            <input
              {...register("confirmpassword")}
              type="password"
              name="confirmpassword"
              placeholder="Nhập mật khẩu mới"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.confirmpassword && (
              <p className="text-red-500">{errors.confirmpassword.message}</p>
            )}
          </div>

          {/* Toggle Notifications */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-gray-600">
              Nhận thông báo qua email
            </label>
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Lưu Thay Đổi
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Setting;
