import Image from "next/image";
import { Navbar } from "../components";
import { AiOutlineFund, AiOutlineDisconnect } from "react-icons/ai";
import { TfiHelpAlt } from "react-icons/tfi";
import { globalStyles } from "../styles";

const style = {
  main: "bg-white dark:bg-darkBg min-h-screen",
  section: "max-w-[1300px] mx-auto h-full",
  hero: "flex items-center mt-12 justify-between max-w-[1300px] mx-auto",
};

export default function Home() {
  return (
    <main className={style.main}>
      <section className={style.section}>
        <Navbar />

        <div className={style.hero}>
          <div className="flex-1">
            <h1 className="text-5xl max-w-[70%] font-bold font-nato">
              Crowdfunding Made Easy
            </h1>
            <p className="font-nato text-xl font-light max-w-[80%] mt-4 leading-snug">
              Let's make diffrence together. You can raise money and our
              platform will let you do that effortlessely with security of
              blockchain.
            </p>
            <div className="mt-8">
              <button
                className={
                  globalStyles.buttonStyle + " w-full max-w-[250px] py-4"
                }
              >
                Explore
              </button>
            </div>
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

        <div className="flex mt-16 items-center justify-self-end justify-between gap-4">
          <div className="w-fit">
            <AiOutlineFund className="text-3xl" />
            <h1 className="text-lg font-bold mt-2 font-nato">Crowdfunding</h1>
            <p className="w-[70%] font-light font-nato">
              We offer crowdfunding for creators who need to solve their
              problems. It's as easy as two steps to sign up.
            </p>
          </div>
          <div className="w-fit">
            <TfiHelpAlt className="text-3xl" />
            <h1 className="text-lg font-bold mt-2 font-nato">Help people</h1>
            <p className="w-[70%] font-light font-nato">
              We're on hand to offer advice how to best champion your cause and
              even gives you tips on fundrasing, should you need us.
            </p>
          </div>
          <div className="w-fit">
            <AiOutlineDisconnect className="text-3xl" />
            <h1 className="text-lg font-bold mt-2 font-nato">
              Connect with others
            </h1>
            <p className="w-[70%] font-light font-nato">
              Our platform allows user and funders connect together and create
              many communities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
