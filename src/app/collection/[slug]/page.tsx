import ListProduct from "../component/listproduct";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ [key: string]: string | string }>;
  searchParams: Promise<{ [key: string]: string | string }>;
}) {
  const searchParam = await searchParams;
  const par = await params;
  const param = par.slug;

  const decodedSlug = decodeURIComponent(param);

  const getProducts = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_URL) {
        throw new Error("API URL is undefined");
      }
      const queryString = new URLSearchParams(searchParam).toString();
      const respone = await fetch(
        `https://backendwebbanhang-sigma.vercel.app/filter/${decodedSlug}?${queryString}`
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
  const getSubCollection = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_URL) {
        throw new Error("API URL is undefined");
      }
      const respone = await fetch(
        `https://backendwebbanhang-sigma.vercel.app/subcollection/${decodedSlug}`
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
  const Subcollection = await getSubCollection();

  return (
    <ListProduct productsData={productsData} Subcollection={Subcollection} />
  );
}
