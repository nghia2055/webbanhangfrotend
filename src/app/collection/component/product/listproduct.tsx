import FilterProduct from "./filterproduct";
import ProductItems from "./productitem";

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
    <div className="grid grid-cols-5 px-5 pt-[200] min-h-[1000] gap-x-14">
      <FilterProduct
        productsData={productsData}
        Subcollection={Subcollection}
      />
      <ProductItems productsData={productsData} Subcollection={Subcollection} />
    </div>
  );
}

export default ListProduct;
