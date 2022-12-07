import { useTheme } from "next-themes";
import Link from "next/link";
import { BsMoon, BsSun } from "react-icons/bs";
import { globalStyles } from "../../styles";

const style = {
  listStyle: "mx-4 font-nato cursor-pointer",
  h1: "font-bold font-nato text-xl",
  nav: "w-full dark:bg-darkBg bg-lightBg flex items-center justify-between py-2",
  linkStyle: "hover:text-primary transition",
  iconStyle: "text-xl",
};

export default function Navbar() {
  const { setTheme, theme } = useTheme();

  return (
    <nav className={style.nav}>
      <h1 className={style.h1}>cfunder</h1>
      <ul className="flex items-center">
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
        <li className={style.listStyle}>
          <button className={globalStyles.buttonStyle + " px-3 py-2"}>
            Get Started
          </button>
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
  );
}
