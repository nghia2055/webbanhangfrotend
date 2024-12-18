import FilterProduct from "./filterproduct";
import ProductItems from "./productitemone";

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

type sub = {
  id: string;
  subCollection: string;
};

function ListProduct({
  productsData = [],
  Subcollection = [],
}: {
  productsData?: data[];
  Subcollection: sub[];
}) {
  return (
    <div className="grid grid-cols-5 px-5 md:pt-[200px] sm:pt-[120px] min-h-[1000px] gap-x-14 lg:pt-[200px] pt-[150px]">
      <FilterProduct
        productsData={productsData}
        Subcollection={Subcollection}
      />
      <ProductItems productsData={productsData} Subcollection={Subcollection} />
    </div>
  );
}

export default ListProduct;
