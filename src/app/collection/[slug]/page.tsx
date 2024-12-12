import ListProduct from "../component/product/listproduct";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: string;
}) {
  const searchParam = await searchParams;
  const param = await params;

  const decodedSlug = decodeURIComponent(param.slug);

  const getProducts = async () => {
    try {
      const queryString = new URLSearchParams(searchParam).toString();
      const respone = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/filter/${decodedSlug}?${queryString}`
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
        `${process.env.NEXT_PUBLIC_API_URL}/subcollection/${decodedSlug}`
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
