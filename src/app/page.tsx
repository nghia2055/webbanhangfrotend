import Link from "next/link";
import Image from "next/image";
import Header from "@/app/component/header/header";
import Footer from "@/app/component/header/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[1480px] mx-auto md:px-4 grid gap-y-6">
        <section className="pt-12 mb-12 md:mx-2 md:flex justify-between">
          <Link href="/">
            <Image
              src="https://www.blissworld.com/cdn/shop/files/Katharine_McPhee_Foster_x_Bliss_Essentials_Kit_HP_Banner_1440px.jpg?v=1729094943&width=1500"
              alt="Description of the image"
              width={774}
              height={492}
              priority
            />
          </Link>
          <div className="flex flex-col gap-6 justify-center items-center">
            <p className="font-bold md:text-2xl text-center">
              My Three-Step Process to Healthy, Clean, Glorious, Glowing Skin!
            </p>
            <p className="font-custom">"Katherine McPhee Foster"</p>
            <p>
              The Essentials Kit includes everything the actress & singer needs
              for an instant refresh
            </p>
            <button className="bg-nav rounded-full w-96 h-20 font-bold hover:bg-black hover:text-nav duration-200 ease-linear ">
              SHOP THE ESSENTIALS KIT
            </button>
          </div>
        </section>
        <section className=" text-center">
          <h1 className="font-custom text-4xl">Shop Our Holiday Collection</h1>
          <div className="grid grid-cols-4 gap-7 my-12 mx-5 md:mx-0  ">
            <Link href="/">
              <Image
                src="https://www.blissworld.com/cdn/shop/files/Bliss_Holiday_24_Homepage_Collection_Image_Merry_Minis_Desktop_and_Mobile__2x-min_400x.jpg?v=1727796969"
                alt="Description of the image"
                width={774}
                height={492}
              />
              <div>
                <h3 className="font-bold mb-2">Merry Minis</h3>
                <p> Tiny luxuries for your skin</p>
              </div>
            </Link>
            <Link href="/">
              <Image
                src="https://www.blissworld.com/cdn/shop/files/Bliss_Holiday_24_Homepage_Collection_Image_Body_Butters_Desktop_and_Mobile__2x-min_400x.jpg?v=1727796822"
                alt="Description of the image"
                width={774}
                height={492}
              />
              <div>
                <h3 className="font-bold mb-2"> Body Butters</h3>
                <p> Nourish for silky holiday skin </p>
              </div>
            </Link>
            <Link href="/">
              <Image
                src="https://www.blissworld.com/cdn/shop/files/Bliss_Holiday_24_Homepage_Collection_Image_Sets_Kits_Desktop_and_Mobile__2x-min_400x.jpg?v=1727797095"
                alt="Description of the image"
                width={774}
                height={492}
              />
              <div>
                <h3 className="font-bold mb-2"> Sets & Kits</h3>{" "}
                <p> Simple, everyday skin and body care</p>
              </div>
            </Link>
            <Link href="/">
              <Image
                src="https://www.blissworld.com/cdn/shop/files/Bliss_Holiday_24_Homepage_Collection_Image_Gifts_Under_20_Desktop_and_Mobile__2x-min_400x.jpg?v=1727796903"
                alt="Description of the image"
                width={774}
                height={492}
              />
              <div>
                <h3 className="font-bold mb-2">Gifts Under $20</h3>
                <p>Blissful skincare at prices you’ll love</p>
              </div>
            </Link>
          </div>
        </section>
        <section className="font-custom text-4xl text-center cursor-pointer bg-nav bg-opacity-10">
          <Image
            src="https://www.blissworld.com/cdn/shop/files/Bliss_Passenger_Princess_x_Teddi_Mellencamp_Secondary_Banner_Desktop_13afb226-53ec-4578-a7a1-29a564893505.jpg?v=1727475914&width=2650"
            width={1512}
            height={481}
            alt="Description of the image"
            className="w-full my-4 md:my-0 "
          />
        </section>
        <section className="md:flex md:items-center md:justify-between bg-nav bg-opacity-20 md:mt-20  ">
          <video
            muted
            autoPlay
            width="500"
            height="500"
            controls
            loop
            preload="none"
            className="md:my-28 md:w-500"
          >
            <source
              src="https://cdn.shopify.com/videos/c/o/v/7cbf6eb5a08e4adea623ab8e4beaf003.mp4"
              type="video/mp4"
            />
            <track
              src="/path/to/captions.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
            Your browser does not support the video tag.
          </video>
          <div className="flex flex-col text-center gap-y-6 items-center">
            <p className="font-custom text-3xl mt-5">How To Exfoliate</p>
            <p className="font-medium md:text-xs lg:text-xl">
              Listen to your beauty bestie Sarah Palmyra: BlissPro Liquid
              Exfoliant delivers smooth skin without stripping.
            </p>
            <button className="bg-nav rounded-full md:w-96 h-20 w-44 mb-6 font-bold hover:bg-black hover:text-nav duration-200 ease-linear">
              SHOP NOW
            </button>
          </div>
        </section>
        <section className="flex justify-center flex-col items-center gap-y-3">
          <h1 className="font-custom md:text-4xl md:mt-16 md:mb-11 text-xs my-3">
            NOT SURE WHAT YOU'RE LOOKING FOR?
            <p className="font-bold text-center">Shop these crowd pleasers</p>
          </h1>
          <div className="grid grid-cols-4 gap-7 w-full md:px-20 px-4 ">
            <Link href="/">
              <Image
                src="https://www.blissworld.com/cdn/shop/files/Bliss_March_HP_-_Product_Recommendations_Skin_Euphoria_Daily_Skin_Perfecting_Serum_2x-min_400x.jpg?v=1709218485"
                alt="Description of the image"
                width={774}
                height={492}
              />
              <p className="text-center mt-4 text-sm font-bold uppercase">
                Skin Euphoria Daily Skin Perfecting Serum
              </p>
            </Link>
            <Link href="/">
              <Image
                src="https://www.blissworld.com/cdn/shop/files/Bliss_March_HP_-_Product_Recommendations_Lemon_Sage_Soapy_Suds_Body_Wash_2x-min_400x.jpg?v=1709219066"
                alt="Description of the image"
                width={774}
                height={492}
              />
              <p className="text-center mt-4 text-sm font-bold uppercase">
                Lemon & Sage Soapy Suds Body Wash
              </p>
            </Link>
            <Link href="/">
              <Image
                src="https://www.blissworld.com/cdn/shop/files/Bliss_March_HP_-_Product_Recommendations_Clear_Genius_Peel_2x-min_400x.jpg?v=1709219122"
                alt="Description of the image"
                width={774}
                height={492}
              />
              <p className="text-center mt-4 text-sm font-bold uppercase">
                Clear Genius Peel
              </p>
            </Link>
            <Link href="/">
              <Image
                src="https://www.blissworld.com/cdn/shop/files/Bliss_March_HP_-_Product_Recommendations_Naked_Body_Butter_Unscented_Moisturizer_2x-min_400x.jpg?v=1709219258"
                alt="Description of the image"
                width={774}
                height={492}
              />
              <p className="text-center mt-4 text-sm font-bold uppercase">
                Naked Body Butter
              </p>
            </Link>
          </div>
          <h3 className=" font-bold md:font-sans md:text-4xl mt-4 mb-5 text-xs">
            Get Social @bliss
          </h3>
          <p className="md:text-3xl font-sans font-bold md:font-normal md:mb-16 text-xs mb-10">
            Your daily dose of happiness, unfiltered.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
