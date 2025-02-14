"use client";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    user: z.string().min(6, "Hãy nhập tên người dùng ít nhất 6 kí tự").max(20),
    email: z.string().email("Hãy nhập email"),
    password: z.string().min(6, "Hãy nhập mật khẩu dài hơn 6 kí tự").max(100),
    confirmPassword: z.string().min(6, "Hãy nhập lại mật khẩu").max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const handleBackHome = () => {
    router.push("/");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      user: values.user,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    const Login = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorData = await res.json(); // Lấy nội dung lỗi từ response
          throw {
            status: res.status,
            message: errorData,
          };
        }
        toast("Bạn đã đăng kí tài khoản thành công.", {
          action: {
            label: "✖", // Biểu tượng nút đóng
            onClick: () => toast.dismiss(), // Đóng Toast
          },
        });
        form.reset();
      } catch (err: any) {
        if (err.message === "Email đã tồn tại") {
          toast("Email đã tồn tại", {
            action: {
              label: "✖", // Biểu tượng nút đóng
              onClick: () => toast.dismiss(), // Đóng Toast
            },
          });
        } else if (err.message === "Người dùng đã tồn tại") {
          toast("Người dùng đã tồn tại", {
            action: {
              label: "✖", // Biểu tượng nút đóng
              onClick: () => toast.dismiss(), // Đóng Toast
            },
          });
        } else {
          toast("Lỗi sever", {
            action: {
              label: "✖", // Biểu tượng nút đóng
              onClick: () => toast.dismiss(), // Đóng Toast
            },
          });
        }
      }
    };
    Login();
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-green-500 w-full h-screen bg-opacity-60 relative ">
        <div className="container sm:mx-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center mx-auto w-full sm:h-[600px] rounded-3xl overflow-hidden sm:w-[1000]">
          <div className="w-1/2 bg-white md:flex justify-center items-center flex-col gap-5 bg-opacity-10 hidden">
            <span className="text-white text-center font-thin text-sm">
              Nếu đã có tài khoản hay nhấn đăng nhập!
            </span>
            <Link href="login">
              <Button
                variant="secondary"
                className="bg-transparent text-white border-white border-2 w-48 rounded-xl"
              >
                Đăng Nhập
              </Button>
            </Link>
          </div>
          <div className="md:w-2/3 md:px-24 px-10 bg-white text-gray-900 flex flex-col items-center justify-center bg-opacity-10 w-full relative">
            <div className="text-end text-3xl font-bold text-red-600 p-10 absolute z-50 -top-7 -right-5  sm:top-0 sm:-right-8 md:right-0 lg:right-0">
              <Button
                variant="secondary"
                className="bg-green-700 opacity-80"
                onClick={handleBackHome}
              >
                X
              </Button>
            </div>
            <p className="mb-10 text-red-500 font-bold text-3xl">
              Đăng Kí Tài Khoản
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 w-full"
              >
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Tên Người Dùng
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Tên người dùng" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Tài Khoản</FormLabel>
                      <FormControl>
                        <Input placeholder="Tài khoản" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel className="text-black">Mật Khẩu</FormLabel>
                        <div className="flex relative">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Mật khẩu"
                              {...field}
                            />
                          </FormControl>

                          <button
                            type="button"
                            className=" absolute text-sm text-gray-600 top-1/2 -translate-y-1/2 right-2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? "Ẩn" : "Hiện"}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel className="text-black">
                          Nhập Lại Mật Khẩu
                        </FormLabel>
                        <div className="flex relative">
                          <FormControl>
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Nhập Lại Mật Khẩu"
                              {...field}
                            />
                          </FormControl>
                          <button
                            type="button"
                            className=" absolute text-sm text-gray-600 top-1/2 -translate-y-1/2 right-2"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? "Ẩn" : "Hiện"}
                          </button>
                        </div>

                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <div className="text-center md:pt-10 p-2">
                  <Button
                    type="submit"
                    variant="secondary"
                    className="bg-green-400 text-white border-white border-2 rounded-xl hover:bg-green-200 w-48"
                  >
                    Đăng Kí
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
