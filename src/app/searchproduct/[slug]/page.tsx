import Productitem from "@/app/collection/component/productitemone";
import Header from "../../component/header/header";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const search = await params;
  const searchParam = search.slug;

  const getProducts = async () => {
    try {
      const respone = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/searchproductall/${searchParam}`
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

  return (
    <>
      <Header />
      {productsData.length > 0 ? (
        <div className="pt-[200px] px-4">
          <Productitem productsData={productsData} Subcollection={[]} />
        </div>
      ) : (
        <div className="pt-[200px] text-center ">Không có sản phẩm nào</div>
      )}
    </>
  );
};

export default Page;
