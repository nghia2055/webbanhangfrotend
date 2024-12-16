"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

function FooterSlice() {
  const [input, setInput] = useState("");
  const [Error, setError] = useState("");
  const [check, setCheck] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError("");
  };

  const handleInfo = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input) && check) {
      toast("Đã đã đăng kí thành công");
      setError("");
      setInput("");
    } else {
      if (!check) {
        setError("Hãy chấp nhận chính sách bảo mật");
      } else if (!emailRegex.test(input)) setError("Email không hợp lệ");
      setError("Hãy điền thông tin gmail và chấp nhận chính sách bảo mật");
    }
  };
  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  };

  return (
    <div>
      <div className="flex h-10 mb-4 relative">
        <input
          value={input}
          onChange={handleChange}
          type="email"
          placeholder="Nhập email của bạn"
          className="w-2/3 outline-none h-full pl-1 text-black"
        />
        <div className="absolute -top-7 text-red-500"> {Error}</div>
        <Button
          variant="destructive"
          className="rounded-none h-full"
          onClick={handleInfo}
        >
          ĐĂNG KÝ
        </Button>
      </div>
      <div>
        <input type="checkbox" onChange={handleChangeCheckbox} />
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
