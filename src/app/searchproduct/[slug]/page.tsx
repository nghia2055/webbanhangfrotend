import Productitem from "@/app/collection/component/product/productitem";
import Header from "../../component/header/header";

const Page = async ({ params }: any) => {
  const searchParam = await params.slug;

  const getProducts = async () => {
    try {
      const respone = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/searchproductall/${searchParam}`
      );
      if (!respone.ok) {
        throw new Error(`http error~ Status: ${respone.status}`);
      }
      const data = await respone.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const productsData = await getProducts();
  console.log("productsData", productsData);

  return (
    <>
      <Header />
      {productsData.length > 0 ? (
        <div className="pt-[200] px-4">
          <Productitem productsData={productsData} Subcollection={[]} />
        </div>
      ) : (
        <div className="pt-[200] text-center ">Không có sản phẩm nào</div>
      )}
    </>
  );
};

export default Page;
