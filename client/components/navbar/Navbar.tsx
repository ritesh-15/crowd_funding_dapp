import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { BsMoon, BsSun } from "react-icons/bs";
import useModal from "../../app/slices/modalSlice/useModal";
import userUser from "../../app/slices/userSlice/userUser";
import { parseWalletAddress } from "../../utils/parseWalletAddress";
import Button from "../button/Button";
import Login from "../login/Login";
import Modal from "../modal/Modal";

const style = {
  listStyle: "mx-4 font-nato cursor-pointer",
  h1: "font-bold font-nato text-xl",
  nav: "w-full dark:bg-darkBg bg-lightBg flex items-center justify-between py-2",
  linkStyle: "hover:text-primary transition",
  iconStyle: "text-xl",
};

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const { handleModalState } = useModal();
  const { isLoggedIn, walletAddress } = userUser();

  return (
    <>
      <nav className={style.nav}>
        <h1 className={style.h1}>cfunder</h1>
        <ul className="flex items-center">
          <ul className="items-center hidden md:flex">
            <li className={style.listStyle}>
              <Link className={style.linkStyle} href="/">
                Home
              </Link>
            </li>
            <li className={style.listStyle}>
              <Link className={style.linkStyle} href="/">
                Explore
              </Link>
            </li>
            <li className={style.listStyle}>
              <Link className={style.linkStyle} href="/">
                Start Campaign
              </Link>
            </li>
          </ul>
          <li className={style.listStyle}>
            {isLoggedIn && walletAddress ? (
              <div className="flex items-center bg-primary py-1 px-3 rounded-full">
                <Image
                  src={`https://avatars.dicebear.com/api/bottts/${walletAddress}.svg`}
                  alt=""
                  width={35}
                  height={35}
                />
                <p className="font-nato text-sm ml-2">
                  {parseWalletAddress(walletAddress)}
                </p>
              </div>
            ) : (
              <Button
                onClick={() => handleModalState(true)}
                title="Get Started"
                className="w-full px-2 py-2"
              />
            )}
          </li>
          <li className={style.listStyle}>
            {theme == "dark" ? (
              <BsSun
                className={style.iconStyle}
                onClick={() => setTheme("light")}
              />
            ) : (
              <BsMoon
                className={style.iconStyle}
                onClick={() => setTheme("dark")}
              />
            )}
          </li>
        </ul>
      </nav>

      {/* Moal */}
      <Modal>
        <Login />
      </Modal>
    </>
  );
}
