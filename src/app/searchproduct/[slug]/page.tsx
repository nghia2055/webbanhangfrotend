import Productitem from "@/app/collection/component/productitemone";
import Header from "../../component/header/header";
import { GetServerSideProps } from "next";
type Data = {
  collection: string;
  _id: string;
  createdAt: string;
  description: string;
  price: number;
  productImages: string[];
  productName: string;
  size: Array<string>;
  subCollection: string;
};
type PageProps = { productsData: Data[] };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchParam = context.params?.slug as string;
  const getProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/searchproductall/${searchParam}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Data[] = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  const productsData = await getProducts();
  return { props: { productsData } };
};
const Page: React.FC<PageProps> = ({ productsData }) => {
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
