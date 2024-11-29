import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <>
      <section className="bg-nav bg-opacity-20 py-10">
        <h1 className="text-center mb-5 font-custom text-2xl lg:h1-after lg:h1-befor ">
          Discover even more to love from our sister brands.
        </h1>
        <div className="grid grid-cols-3 gap-4 md:px-56 px-8 text-center">
          <Link href="/">
            <Image
              src="https://www.blissworld.com/cdn/shop/files/laura_geller_1.png?v=1717092943&width=600"
              alt="Description of the image"
              width={774}
              height={492}
            />
          </Link>
          <Link href="/">
            <Image
              src="https://www.blissworld.com/cdn/shop/files/julep_1.png?v=1717092944&width=600"
              alt="Description of the image"
              width={774}
              height={492}
            />
          </Link>
          <Link href="/">
            <Image
              src="https://www.blissworld.com/cdn/shop/files/coverfx_1.png?v=1717092943&width=600"
              alt="Description of the image"
              width={774}
              height={492}
            />
          </Link>
        </div>
      </section>
      <section className="md:flex md:justify-evenly font-bold md:text-2xl py-10 bg-[#d2b1e1] gap-4 flex text-sm px-6 justify-evenly">
        <h1>free shipping on orders $50+</h1>
        <span className="w-space bg-black"></span>
        <h1>we ship internationally</h1>
      </section>
      <section className="grid md:grid-cols-5 bg-nav md:px-24 md:gap-x-7 pt-12 grid-cols-2 gap-y-4">
        <div className="col-span-1">
          <h1 className="font-customRegular text-3xl">COMPANY</h1>
          <div>
            <h2>Who We Are</h2>
            <h2>Find a Bliss Near You</h2>
            <h2>Shop</h2>
            <h2>Privacy Policy</h2>
          </div>
        </div>
        <div className="col-span-1">
          <h1 className="font-customRegular text-3xl">FOR YOU</h1>
          <div>
            <h2>Who We Are</h2>
            <h2>Find a Bliss Near You</h2>
            <h2>Shop</h2>
            <h2>Privacy Policy</h2>
          </div>
        </div>
        <div className="col-span-1">
          <h1 className="font-customRegular text-3xl">QUICK SHOP</h1>
          <div>
            <h2>Who We Are</h2>
            <h2>Find a Bliss Near You</h2>
            <h2>Shop</h2>
            <h2>Privacy Policy</h2>
          </div>
        </div>
        <div className="col-span-2 flex items-start flex-col md:pr-28">
          <h1 className="font-customRegular text-3xl">STAY IN TOUCH</h1>
          <div className="font-bold flex flex-col items-start gap-4 pt-6">
            <span>
              Sign up for our newsletter to recieve 20% off your first order!
            </span>
            <div className="flex items-center space-x-2 ">
              <Input type="email" placeholder="Email" />
              <Button variant="outline" type="submit">
                Submit
              </Button>
            </div>
            <span className="font-thin text-sm">
              By signing up for our newsletter, you agree to our
              <Link href="/" className="underline">
                {" "}
                terms
              </Link>{" "}
              and
              <Link href="/" className="underline">
                {" "}
                privacy policy
              </Link>
              .
            </span>
            <span className="mt-10">
              Prefer texting? Sign up for texts to receive SMS exclusive offers
              plus 20% off your first order.
            </span>
            <div className="flex flex-col items-start ">
              <div className="flex">
                <Input type="email" placeholder="Email" />
                <Button variant="outline" type="submit">
                  Submit
                </Button>
              </div>
              <span className="font-thin text-xs w-full h-full mt-5">
                * By submitting this form and signing up for texts, you consent
                to receive marketing text messages (e.g. promos, cart reminders)
                from Bliss World at the number provided, including messages sent
                by autodialer. Consent is not a condition of purchase. Msg &
                data rates may apply. Msg frequency varies. Unsubscribe at any
                time by replying STOP or clicking the unsubscribe link (where
                available). Privacy Policy & Terms.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
