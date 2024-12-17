import Header from "../component/header/header";
import SearchMenu from "./search";

function Page() {
  return (
    <>
      <Header />
      <div className="sm:pt-[100px] mx-20 text-center md:pt-[200px] pt-[150px] ">
        <SearchMenu />
      </div>
    </>
  );
}

export default Page;
