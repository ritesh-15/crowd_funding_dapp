import Image from "next/image";
import { Button, Navbar } from "../components";
import { AiOutlineFund, AiOutlineDisconnect } from "react-icons/ai";
import { TfiHelpAlt } from "react-icons/tfi";
import useWallet from "../hooks/useWallet";

const style = {
  main: "bg-white dark:bg-darkBg min-h-screen",
  section: "max-w-[1300px] mx-auto h-full w-[95%] pb-4",
  hero: "flex items-center mt-12 justify-between flex-col md:flex-row flex-col-reverse",
};

export default function Home() {
  useWallet();

  return (
    <main className={style.main}>
      <section className={style.section}>
        <Navbar />

        <div className={style.hero}>
          <div className="flex-1 mt-8 md:mt-0 flex flex-col items-center md:items-start">
            <h1 className="text-3xl w-full md:text-5xl md:max-w-[70%] font-bold font-nato text-center md:text-left mx-auto md:mx-0">
              Crowdfunding Made Easy
            </h1>
            <p className="font-nato  text-lg sm:max-w-[75%] md:text-xl w-full font-light md:max-w-[80%] mt-4 leading-snug md:text-left text-center mx-auto md:mx-0">
              Let's make diffrence together. You can raise money and our
              platform will let you do that effortlessely with security of
              blockchain.
            </p>
            <Button
              title="Explore"
              className="w-full px-4 py-3 mt-8 max-w-[300px]"
            />
          </div>

          <div className="flex-1">
            <Image
              src="/images/hero.svg"
              alt=""
              width={400}
              height={150}
              className="mx-auto"
            />
          </div>
        </div>

        <div className="flex mt-16 items-center justify-between gap-4 flex-col md:flex-row">
          <div className="w-fit flex flex-col items-center md:items-start">
            <AiOutlineFund className="text-3xl" />
            <h1 className="text-lg font-bold mt-2 font-nato">Crowdfunding</h1>
            <p className="w-full sm:w-[75%] md:w-[70%] font-light font-nato text-center md:text-left">
              We offer crowdfunding for creators who need to solve their
              problems. It's as easy as two steps to sign up.
            </p>
          </div>
          <div className="w-fit flex flex-col items-center md:items-start">
            <TfiHelpAlt className="text-3xl" />
            <h1 className="text-lg font-bold mt-2 font-nato">Help people</h1>
            <p className="w-full sm:w-[75%] md:w-[70%] font-light font-nato text-center md:text-left">
              We're on hand to offer advice how to best champion your cause and
              even gives you tips on fundrasing, should you need us.
            </p>
          </div>
          <div className="w-fit flex flex-col items-center md:items-start">
            <AiOutlineDisconnect className="text-3xl" />
            <h1 className="text-lg font-bold mt-2 font-nato">
              Connect with others
            </h1>
            <p className="w-full sm:w-[75%] md:w-[70%] font-light font-nato text-center md:text-left">
              Our platform allows user and funders connect together and create
              many communities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
