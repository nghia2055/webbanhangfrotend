import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <div className="pt-14 bg-nav  ">
        <div className="grid grid-cols-2 gap-x-10 pb-20 border-b-2 px-4">
          <div>
            <span>ĐĂNG KÍ NHẬN THÔNG TIN</span>
            <p>
              Đăng ký ngay để được cập nhật sớm nhất những thông tin hữu ích, ữu
              đãi vô cùng hấp dẫn và những món quà bất ngờ từ Nghĩa!
            </p>
          </div>
          <div>
            <div className="flex h-10 mb-4">
              <input
                placeholder="Nhập email của bạn"
                className="w-2/3 outline-none h-full pl-1 text-black"
              />
              <Button variant="destructive" className="rounded-none h-full">
                ĐĂNG KÝ
              </Button>
            </div>
            <div>
              <input type="checkbox" />
              <span>
                Tôi đã đọc và đồng ý với{" "}
                <span className="cursor-pointer">Chính sách bảo mật</span>
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 px-4 gap-x-8 pb-32 border-b-2 mt-10">
          <div className="col-span-3">
            <p className="mb-3">Nghĩa - Giày Chính Hãng</p>
            <div className="flex space-x-2">
              <span>icon</span>
              <span>
                NghĩaShop được định hướng trở thành hệ thống thương mại điện tử
                bán giày chính hãng hàng đầu Việt Nam. <br />
                <span>Showroom: 249 Xã Đàn, Hà Nội</span> <br />
                Hotline: 0707686606
              </span>
            </div>
          </div>
          <div className="col-span-1 flex flex-col space-y-2">
            <p className="mb-3">VỀ CHÚNG TÔI</p>
            <Link href="/" className="inline-block !mt-0">
              Giới thiệu
            </Link>
            <Link href="/">Điều khoản sử dụng</Link>
            <Link href="/">Chính sách bảo mật</Link>
            <Link href="/">Tin tức</Link>
            <Link href="/">Cơ hội việc làm</Link>
            <Link href="/">Liên hệ</Link>
          </div>
          <div className="col-span-1 flex flex-col space-y-2">
            <p className="mb-3">KHÁCH HÀNG</p>
            <Link href="/" className="inline-block !mt-0">
              Hướng dẫn mua hàng
            </Link>
            <Link href="/">Chính sách đổi trả</Link>
            <Link href="/">Chính sách bảo hành</Link>
            <Link href="/">Khách hàng thân thiết</Link>
            <Link href="/">Hướng dẫn chọn size</Link>
            <Link href="/">Chương trình khuyến mại</Link>
          </div>
          <div className="col-span-2">
            <p>CHỨNG NHẬN</p>
          </div>
        </div>
        <div className="p-4 flex justify-between">
          <div>
            <p>Công ty cổ phần đầu tư và công nghệ Mygroup</p>
            <p className="text-sm font-sans">Địa chỉ: Sao Hỏa</p>
            <p className="text-sm font-sans">GPĐKKD: ########. © 2016 - 2024</p>
          </div>
          <div>
            <p>Kết nối với Myshoes.vn</p>
            <div className="flex justify-between">
              <FaFacebookSquare className="bg-blue-900 w-8 h-8" />
              <FaYoutube className="bg-red-600 w-8 h-8" />
              <FaInstagramSquare className="bg-red-500 w-8 h-8" />
            </div>
          </div>
          <div>Visa MasterCart</div>
        </div>
      </div>
    </>
  );
}

export default Footer;
