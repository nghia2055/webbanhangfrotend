"use client";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { setLogin } from "@/app/redux/slice/sliceAuth";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import exam from "../../../../public/284466.jpg";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      email: values.email,
      password: values.password,
    };
    const Login = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8080/login", {
          method: "POST",
          credentials: "include", // Nếu dùng cookie
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        if (res.status === 200) {
          dispatch(setLogin(true));
          router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    };
    Login();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-green-500 w-full h-screen bg-opacity-60">
        <div className="container sm:mx-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center mx-auto w-full sm:h-[500] rounded-3xl overflow-hidden sm:w-[1000] ">
          <div className="w-1/2 bg-white flex justify-center items-center flex-col gap-5 bg-opacity-10">
            <span className="text-white text-center font-thin text-sm">
              Nếu chưa có tài khoản hãy nhấn vào đăng kí!
            </span>
            <Link href="register">
              <Button
                variant="secondary"
                className="bg-transparent text-white border-white border-2 w-48 rounded-xl"
              >
                Đăng Kí
              </Button>
            </Link>
          </div>
          <div className="w-2/3 px-24 bg-white text-gray-900 flex flex-col items-center justify-center bg-opacity-10">
            <p className="mb-10 text-red-500 font-bold text-3xl">Đăng Nhập</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 w-full"
              >
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
                    <FormItem>
                      <FormLabel className="text-black">Mật Khẩu</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Mật khẩu"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center pt-10">
                  <Button
                    type="submit"
                    variant="secondary"
                    className="bg-green-400 text-white border-white border-2 rounded-xl hover:bg-green-200 w-48"
                  >
                    Đăng Nhập
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

export default Login;
