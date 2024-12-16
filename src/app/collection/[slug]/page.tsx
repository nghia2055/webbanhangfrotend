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
      const queryString = new URLSearchParams(searchParam).toString();
      const respone = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/filter/${decodedSlug}?${queryString}`
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
      const respone = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/subcollection/${decodedSlug}`
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
