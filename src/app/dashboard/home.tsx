"use client";
import Image from "next/image";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white py-6 px-8">
        <div className="flex items-center justify-between overflow-hidden md:overflow-auto">
          <h1 className="text-3xl font-bold">MyShop</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="hover:text-blue-300 hidden">
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-300">
                  Tính Năng
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-blue-300">
                  Sản Phẩm
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-300">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Banner */}
      <section
        className="relative bg-cover bg-center h-[530px] md:h-[500px]"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1500x500')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <h2 className="md:text-5xl text-sm font-semibold">
              Chào Mừng Đến Với MyShop
            </h2>
            <p className="md:text-lg text-xs mt-4">
              Mua sắm những sản phẩm chất lượng, giá cả hợp lý!
            </p>
            <a
              href="#products"
              className="mt-6 inline-block py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Khám Phá Ngay
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 bg-gray-100 text-center hidden md:block"
      >
        <h3 className="text-3xl font-semibold text-gray-800 mb-8">
          Tính Năng Nổi Bật
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold text-blue-800">
              Dễ Dàng Mua Sắm
            </h4>
            <p className="mt-4 text-gray-600">
              Tìm kiếm và mua sắm các sản phẩm yêu thích chỉ trong vài cú click.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold text-blue-800">
              Thanh Toán An Toàn
            </h4>
            <p className="mt-4 text-gray-600">
              Chúng tôi đảm bảo các giao dịch của bạn được bảo mật tối đa.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold text-blue-800">
              Giao Hàng Nhanh Chóng
            </h4>
            <p className="mt-4 text-gray-600">
              Sản phẩm sẽ được giao đến tận tay bạn trong thời gian ngắn nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="products" className="py-16 px-6 text-center hidden md:block">
        <h3 className="text-3xl font-semibold text-gray-800 mb-8">
          Sản Phẩm Nổi Bật
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Image
              height={500}
              width={500}
              src="https://via.placeholder.com/300"
              alt="Product 1"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h4 className="text-xl font-semibold mt-4 text-gray-800">
              Sản Phẩm 1
            </h4>
            <p className="text-lg text-gray-600 mt-2">Giá: 1,200,000 VNĐ</p>
            <a
              href="#"
              className="mt-4 inline-block py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Mua Ngay
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Image
              height={500}
              width={500}
              src="https://via.placeholder.com/300"
              alt="Product 2"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h4 className="text-xl font-semibold mt-4 text-gray-800">
              Sản Phẩm 2
            </h4>
            <p className="text-lg text-gray-600 mt-2">Giá: 1,500,000 VNĐ</p>
            <a
              href="#"
              className="mt-4 inline-block py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Mua Ngay
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Image
              height={500}
              width={500}
              src="https://via.placeholder.com/300"
              alt="Product 3"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h4 className="text-xl font-semibold mt-4 text-gray-800">
              Sản Phẩm 3
            </h4>
            <p className="text-lg text-gray-600 mt-2">Giá: 850,000 VNĐ</p>
            <a
              href="#"
              className="mt-4 inline-block py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Mua Ngay
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 text-center">
        <p>&copy; 2024 MyShop. Tất cả quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default HomePage;
