import { notFound } from "next/navigation";
import Header from "../component/header/header";
import Footer from "../component/header/footer";

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = [
    "/gioi-thieu",
    "/dieu-khoan-su-dung",
    "/chinh-sach-bao-mat",
    "/chinh-sach-bao-hanh-va-doi-hang",
  ];

  return products.map((product: string) => ({
    slug: product,
  }));
}

const blog = async ({ params }: { params: { slug: string } }) => {
  const param = await params;
  const name = param.slug;

  if (name === "/gioi-thieu") {
    return (
      <>
        <Header />
        <div className="px-20 mb-56 pt-[200px]">
          <h2 className=" font-bold text-2xl">Giới thiệu NghiaShop.vn</h2>
          <section className="mt-16 opacity-60 ">
            <h1 className="text-center font-bold text-2xl mb-4">
              Nghĩa SHOP - Sải bước thành công!
            </h1>
            <p className="text-justify">
              Nghĩa SHOP ra đời với tất cả niềm đam mê thương mại điện tử và
              giày dép của những người sáng lập. Chúng tôi mong muốn mang đến
              cho khách hàng những đôi giày tốt nhất, giúp khách hàng luôn cảm
              thấy tự tin vững bước theo đuổi niềm đam mê của bản thân để thành
              công vượt trội. Nghĩa SHOP là hệ thống bán giày chính hãng từ các
              thương hiệu hàng đầu thế giới như: Nike, Adidas, Lacoste, Puma,
              New balance, Ascis,... Tất cả các sản phẩm đều có nguồn gốc xuất
              sứ rõ ràng chính hãng. Nghĩa SHOP nói không với hàng fake, hàng
              chất lượng kém. Khi mua hàng tại Nghĩa SHOP khách hàng sẽ luôn có
              được sản phẩm tốt nhất với mức giá cực kỳ hấp dẫn mà khó có thể
              tìm được ở nơi khác. Ngoài ra, Nghĩa SHOP mong muốn mang đến cho
              khách hàng những trải nghiệm mua sắm tuyệt vời với sự tư vấn nhiệt
              tình và chân thành nhất từ đội ngũ bán hàng chuyên nghiệp, những
              phần quà bất ngờ và tình cảm sâu sắc của Nghĩa SHOP gửi gắm trên
              từng sản phẩm. Myshoes sẽ nỗ lực hết sức để mỗi sản phẩm đến tay
              khách hàng là mang đến một niềm vui thú vị. Nghĩa SHOP luôn tâm
              niệm rằng chất lượng sản phẩm và dịch vụ khách hàng tuyệt vời là
              những yếu tố quan trọng nhất quyết định sự thành công của một
              thương hiệu và đó là giá trị cốt lõi mà Nghĩa SHOP sẽ mang tới cho
              khách hàng của mình. Hãy cùng đồng hành với Nghĩa SHOP để "Sải
              bước thành công" nhé! Trân trọng,
            </p>
            ---------------------------------------
            <div>
              <p className="font-bold text-xl">Nghĩa SHOP - Giày chính hãng</p>
              <p>Showroom: Sao Hỏa</p>
              <p>Điện thoại: 0707 686 606</p>
              <p>Email: dtn04999@gmail.com</p>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  } else if (name === "/dieu-khoan-su-dung") {
    return (
      <>
        <Header />
        <div className="px-8 pt-[200px]">
          <h2 className=" font-bold text-2xl">ĐIỀU KHOẢN SỬ DỤNG</h2>
          <section className="mt-16 opacity-60 space-y-6 mb-20">
            <div>
              <p>
                Chào mừng bạn đến mua hàng qua mạng tại Nghĩa SHOP. Sau khi truy
                cập vào website để tham khảo hoặc mua sắm, bạn đã đồng ý tuân
                thủ và ràng buộc với những quy định của Nghĩa SHOP. Vui lòng xem
                kỹ các quy định và hợp tác với chúng tôi để xây dựng 1 website
                Nghĩa SHOP ngày càng thân thiện và phục vụ tốt những yêu cầu của
                chính bạn. Ngoài ra, nếu có bất cứ câu hỏi nào về những thỏa
                thuận trên đây, vui lòng email cho chúng tôi qua địa chỉ:
                cskh@Nghĩa SHOP
              </p>
              <h1 className="mt-6 font-bold">1. Tài khoản của bạn</h1>
              <p>
                Khi sử dụng dịch vụ Nghĩa SHOP, bạn sẽ cung cấp cho chúng tôi
                thông tin về địa chỉ email, mật khẩu và họ tên để có được 1 tài
                khoản tại đây. Việc sử dụng và bảo mật thông tin tài khoản là
                trách nhiệm và quyền lợi của bạn khi sử dụng Nghĩa SHOP. Ngoài
                ra, những thông tin khác trong tài khoản như tên tuổi, địa
                chỉ.... là những thông tin sẽ giúp Nghĩa SHOP phục vụ bạn tốt
                nhất. Trong trường hợp thông tin do bạn cung cấp không đầy đủ
                hoặc sai dẫn đến việc không thể giao hàng cho bạn, chúng tôi có
                quyền đình chỉ hoặc từ chối phục vụ, giao hàng mà không phải
                chịu bất cứ trách nhiệm nào đối với bạn. Khi có những thay đổi
                thông tin của bạn, vui lòng cập nhật lại thông tin trong tài
                khoản tại Nghĩa SHOP. Bạn phải giữ kín mật khẩu và tài khoản,
                hoàn toàn chịu trách nhiệm đối với tất cả các hoạt động diễn ra
                thông qua việc sử dụng mật khẩu hoặc tài khoản của mình. Bạn nên
                đảm bảo thoát khỏi tài khoản tại Nghĩa SHOP sau mỗi lần sử dụng
                để bảo mật thông tin của mình
              </p>
            </div>
            <div>
              <h1 className="font-bold">
                2. Quyền lợi bảo mật thông tin của bạn
              </h1>
              <p>
                Khi sử dụng dịch vụ tại website Nghĩa SHOP, bạn được đảm bảo
                rằng những thông tin cung cấp cho chúng tôi sẽ chỉ được dùng để
                nâng cao chất lượng dịch vụ dành cho khách hàng của Nghĩa SHOP
                và sẽ không được chuyển giao cho 1 bên thứ ba nào khác vì mục
                đích thương mại. Thông tin của bạn tại Nghĩa SHOP sẽ được chúng
                tôi bảo mật và chỉ trong trường hợp pháp luật yêu cầu, chúng tôi
                sẽ buộc phải cung cấp những thông tin này cho các cơ quan pháp
                luật.
              </p>
            </div>
            <div>
              <h1 className="font-bold">
                3. Trách nhiệm của bạn khi sử dụng dịch vụ của Nghĩa SHOP
              </h1>
              <p>
                Bạn tuyệt đối không được sử dụng bất kỳ công cụ, phương pháp nào
                để can thiệp, xâm nhập bất hợp pháp vào hệ thống hay làm thay
                đổi cấu trúc dữ liệu tại website Nghĩa SHOP. Bạn không được có
                những hành động ( thực hiện, cổ vũ) việc can thiệp, xâm nhập dữ
                liệu của Nghĩa SHOP cũng như hệ thống máy chủ của chúng tôi
                Ngoài ra, xin vui lòng thông báo cho quản trị web của Nghĩa SHOP
                ngay khi bạn phát hiện ra lỗi hệ thống theo số điện thoại
                0707686606 hoặc email: dtn04999@gmail.com
              </p>
              <p className="mt-8">
                Bạn không được đưa ra những nhận xét, đánh giá có ý xúc phạm,
                quấy rối, làm phiền hoặc có bất cứ hành vi nào thiếu văn hóa đối
                với người khác. Không nêu ra những nhận xét có tính chính trị (
                tuyên truyền, chống phá, xuyên tạc chính quyền), kỳ thị tôn
                giáo, giới tính, sắc tộc.... Tuyệt đối cấm mọi hành vi mạo nhận,
                cố ý tạo sự nhầm lẫn mình là một khách hàng khác hoặc là thành
                viên Ban Quản Trị Nghĩa SHOP.
              </p>
            </div>
            <div>
              <h1 className="font-bold">
                4. Trách nhiệm và quyền lợi của Nghĩa SHOP
              </h1>
              <p>
                Trong trường hợp có những phát sinh ngoài ý muốn hoặc trách
                nhiệm của mình, Nghĩa SHOP sẽ không chịu trách nhiệm về mọi tổn
                thất phát sinh. Ngoài ra, chúng tôi không cho phép các tổ chức,
                cá nhân khác quảng bá sản phẩm tại website Nghĩa SHOP mà chưa có
                sự đồng ý bằng văn bản từ Nghĩa SHOP. Các thỏa thuận và quy định
                trong Điều khoản sử dụng có thể thay đổi vào bất cứ lúc nào
                nhưng sẽ được Nghĩa SHOP thông báo cụ thể trên website Nghĩa
                SHOP.
              </p>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  } else if (name === "/chinh-sach-bao-mat") {
    return (
      <>
        <Header />
        <div className="px-8 pt-[200px]">
          <h2 className=" font-bold text-2xl">CHÍNH SÁCH BẢO MẬT</h2>
          <section className="mt-16 opacity-60 space-y-6 ">
            <div className="space-y-4 pb-10">
              <p>
                Bảo mật thông tin khách hàng là một trong những ưu tiên nhằm tạo
                điều kiện mua hàng trực tuyến tốt nhất cho bạn tại Nghĩa SHOP.
                Chúng tôi hiểu sử dụng hợp lý và bảo mật thông tin sẽ thể hiện
                sự quan tâm của Nghĩa SHOP dành cho bạn. Vì thế, Nghĩa SHOP cam
                kết việc sử dụng thông tin trên sẽ chỉ nhằm nâng cao chất lượng
                dịch vụ khách hàng và tạo môi trường mua sắm trực tuyến an tòan,
                tiện lợi tại Nghĩa SHOP. Cụ thể, thông tin của bạn chỉ dùng để:
              </p>
              <p>
                1. Cung cấp một số tiện ích, nâng cao chất lượng dịch vụ hỗ trợ
                khách hàng​
              </p>
              <p>
                2. Giải quyết các vấn đề, tranh chấp phát sinh liên quan đến
                việc sử dụng website Nghĩa SHOP
              </p>
              <p>3. Ngăn chặn những hoạt động vi phạm pháp luật Việt Nam</p>
              <p>
                4. Nghĩa SHOP cam đoan sẽ không bán, chia sẻ dẫn đến làm lộ
                thông tin cá nhân của bạn vì mục đích thương mại vi phạm cam kết
                của chúng tôi ghi trong chính sách bảo mật này. Tất cả thông tin
                giao dịch giữa bạn và Nghĩa SHOP sẽ được bảo mật qua phần mềm mã
                hóa tất cả thông tin bạn nhập vào.
              </p>
              <p>
                5. Tuy nhiên, bạn không nên trao đổi những thông tin thanh toán,
                giao nhận của mình cho 1 bên thứ 3 nào khác để tránh rò rỉ thông
                tin. Khi sử dụng chung máy tính với nhiều người, vui lòng thoát
                khỏi tài khoản mỗi khi không sử dụng dịch vụ của Nghĩa SHOP nữa
                để tự bảo vệ thông tin về mật khẩu truy cập của mình.
              </p>
              <p>
                6. Ngoài ra, bạn tuyệt đối không được sử dụng bất kỳ hình thức
                nào để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu.
                Chúng tôi nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất
                kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ
                liệu của hệ thống website. Mọi vi phạm sẽ bị tước bỏ mọi quyền
                lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết. Mọi
                thông tin của bạn tại Nghĩa SHOP sẽ được chúng tôi bảo mật nhưng
                trong trường hợp pháp luật yêu cầu, chúng tôi buộc phải cung cấp
                thông tin này cho cơ quan pháp luật
              </p>
              <p>
                7. Nghĩa SHOP hiểu rằng quyền lợi của bạn trong việc bảo vệ
                thông tin cá nhân cũng chính là trách nhiệm của chúng tôi nên
                trong bất kỳ trường hợp có thắc mắc, góp ý nào liên quan đến
                chính sách bảo mật của Nghĩa SHOP, vui lòng liên hệ qua số điện
                thoại: 0707686606 hoặc email: dtn04999@gmail.com
              </p>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  } else if (name === "/chinh-sach-bao-hanh-doi-hang") {
    return (
      <>
        <Header />
        <div className="px-8 pt-[200px]">
          <h2 className=" font-bold text-2xl">CHÍNH SÁCH BẢO HÀNH ĐỔI HÀNG</h2>
          <section className="mt-16 opacity-60 space-y-6 ">
            <div className="space-y-4 pb-10">
              <p className="font-bold text-xl">
                I. Chính sách bảo hành sản phẩm
              </p>
              <p>
                Nghĩa SHOP cam kết tất cả các sản phẩm là hàng chính hãng 100%!
              </p>
              <p>
                Trong quá trình sử dụng, nếu phát hiện sản phẩm có những vấn đề
                do lỗi của nhà sản xuất. Thời gian bảo hành trong vòng 06 tháng
                kể từ ngày mua (chỉ bảo hành các lỗi như bong keo, sứt chỉ).
              </p>
              <p>
                Lưu ý: Nghĩa SHOP sẽ không bảo hành nếu quý khách tự ý thay đổi,
                sửa chữa và tác động vào sản phẩm hoặc không làm theo phương
                pháp bảo quản, cách sử dụng dẫn đến sản phẩm bị hư hại.
              </p>
              <p className="font-bold text-xl">
                II. Chính sách đổi hàng và hoàn tiền
              </p>

              <p>
                - Nghĩa SHOP đổi hàng trong 30 ngày kể từ ngày Quý khách nhận
                hàng đối với sản phẩm chưa sử dụng còn nguyên vẹn như lúc nhận
                hàng (nguyên hộp, tem, mác, hóa đơn, thẻ bảo hành,...).
              </p>
              <p>
                - Nghĩa SHOP hoàn tiền 200% cho Quý khách nếu Quý khách phát
                hiện hàng giả, hàng nhái.
              </p>
              <p>
                Mọi thông tin về việc bảo hành, đổi hàng Quý khách vui lòng liên
                hệ với bộ phận chăm sóc khách hàng của Nghĩa SHOP.
              </p>
              <p>Số điện thoại: 0707686606</p>
              <p>Email: dtn04999@gmail.com</p>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  }
};

export default blog;
