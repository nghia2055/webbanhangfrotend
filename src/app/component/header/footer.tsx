import Link from "next/link";

import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import FooterSlice from "../footerslice";

function Footer() {
  return (
    <>
      <div className="pt-14 bg-nav  ">
        <div className="grid grid-cols-2 gap-x-10 pb-20 border-b-2 px-4">
          <div>
            <span className="mb-2 block font-bold text-xl">
              ĐĂNG KÍ NHẬN THÔNG TIN
            </span>
            <p>
              Đăng ký ngay để được cập nhật sớm nhất những thông tin hữu ích, ữu
              đãi vô cùng hấp dẫn và những món quà bất ngờ từ Nghĩa!
            </p>
          </div>
          <FooterSlice />
        </div>
        <div className="grid grid-cols-7 px-4 gap-x-8 pb-32 border-b-2 mt-10">
          <div className="col-span-3">
            <p className="mb-3">Nghĩa - Giày Chính Hãng</p>
            <div className="flex space-x-2">
              <video
                width="100"
                height="100"
                autoPlay
                muted
                loop
                className="no-controls"
              >
                <source src="/NghiaSHOP.mp4" type="video/mp4" />
                <track
                  src="/path/to/captions.vtt"
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                />
                Your browser does not support the video tag.
              </video>

              <span>
                NghĩaShop được định hướng trở thành hệ thống thương mại điện tử
                bán giày chính hãng hàng đầu Việt Nam. <br />
                <span>Showroom: Sao Hỏa</span> <br />
                Hotline: 0707686606
              </span>
            </div>
          </div>
          <div className="col-span-1 flex flex-col space-y-2">
            <p className="mb-3">VỀ CHÚNG TÔI</p>
            <Link href="/gioi-thieu" className="inline-block !mt-0">
              Giới thiệu
            </Link>
            <Link href="/dieu-khoan-su-dung">Điều khoản sử dụng</Link>
            <Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
          </div>
          <div className="col-span-1 flex flex-col space-y-2">
            <p className="mb-3">KHÁCH HÀNG</p>

            <Link href="/chinh-sach-bao-hanh-doi-hang">
              Chính sách bảo hành và đổi hàng
            </Link>
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
              <Link href="https://www.facebook.com/">
                <FaFacebookSquare className=" w-8 h-8" />
              </Link>
              <Link href="https://www.youtube.com/">
                <FaYoutube className=" w-8 h-8" />
              </Link>
              <Link href="https://www.instagram.com/">
                <FaInstagramSquare className=" w-8 h-8" />
              </Link>
            </div>
          </div>
          <div>Visa MasterCart</div>
        </div>
      </div>
    </>
  );
}

export default Footer;
