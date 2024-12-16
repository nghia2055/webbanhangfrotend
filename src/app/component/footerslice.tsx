"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

function FooterSlice() {
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");
  const [check, setCheck] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setErr("");
  };

  const handleInfo = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input) && check) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: input }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        toast("Bạn đã đăng kí thành công");
      } catch (err) {
        console.log(err);
        toast("Bạn đã đăng kí thất bại");
      }

      setErr("");
      setInput("");
      setCheck(false);
    } else {
      if (!check && !emailRegex.test(input)) {
        setErr("Hãy điền thông tin gmail và chấp nhận chính sách bảo mật");
      } else if (!emailRegex.test(input)) {
        setErr("Email không hợp lệ");
      } else if (!check) {
        setErr("Hãy chấp nhận chính sách bảo mật");
      }
    }
  };
  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(input) && check) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/notification`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: input }),
            }
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message);
          }
          toast("Bạn đã đăng kí thành công");
        } catch (err) {
          toast("Bạn đã đăng kí thất bại");
        }

        setErr("");
        setInput("");
        setCheck(false);
      } else {
        if (!check && !emailRegex.test(input)) {
          setErr("Hãy điền thông tin gmail và chấp nhận chính sách bảo mật");
        } else if (!emailRegex.test(input)) {
          setErr("Email không hợp lệ");
        } else if (!check) {
          setErr("Hãy chấp nhận chính sách bảo mật");
        }
      }
    }
  };

  return (
    <div>
      <div className="flex h-10 mb-4 relative">
        <input
          onKeyDown={handleKeyDown}
          value={input}
          onChange={handleChange}
          type="email"
          placeholder="Nhập email của bạn"
          className="w-2/3 outline-none h-full pl-1 text-black"
        />
        <div className="absolute -top-7 text-red-500"> {err}</div>
        <Button
          variant="destructive"
          className="rounded-none h-full"
          onClick={handleInfo}
        >
          ĐĂNG KÝ
        </Button>
      </div>
      <div>
        <input
          type="checkbox"
          onChange={handleChangeCheckbox}
          checked={check}
        />
        <span>
          Tôi đã đọc và đồng ý với{" "}
          <Link href="chinh-sach-bao-mat" className="underline">
            {" "}
            Chính sách bảo mật
          </Link>
        </span>
      </div>
    </div>
  );
}

export default FooterSlice;
