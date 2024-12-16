import Productitem from "../../component/productitem";

type data = {
  collection: string;
  _id: string;
  createdAt: string;
  description: string;
  price: number;
  productImages: string[];
  productName: string;
  size: Array<"XL" | "L" | string>;
  subCollection: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; id: number }>;
}) {
  const { id } = await params;

  const getProducts = async () => {
    try {
      const respone = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/productitems/${id}`
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

  const productsItemsData: data = await getProducts();

  return <Productitem productsItemsData={productsItemsData} />;
}
