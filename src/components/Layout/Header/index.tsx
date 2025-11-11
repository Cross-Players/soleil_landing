"use client";
import {
  navLinks1,
  navLinks2,
} from "@/app/api/navlink";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import NavLink from "./Navigation/NavLink";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

const Header: React.FC = () => {
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] =
    useState(false);
  const pathname = usePathname();

  const sideMenuRef =
    useRef<HTMLDivElement>(null);

  const handleClickOutside = (
    event: MouseEvent
  ) => {
    if (
      sideMenuRef.current &&
      !sideMenuRef.current.contains(
        event.target as Node
      )
    ) {
      setNavbarOpen(false);
    }
  };

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      handleScroll
    );
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [handleScroll]);

  const isHomepage = pathname === "/";

  return (
    <header
      className={`fixed h-24 py-1 z-50 w-full bg-transparent transition-all duration-300 lg:px-0 px-4 ${
        sticky ? "top-3" : "top-0"
      }`}
    >
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between pt-6 pb-4 duration-300 shadow-none top-0 px-4`}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center gap-2 w-full">
          <div>
            <Link href="/">
              <Image
                src={"/images/header_logo.png"}
                alt="logo"
                width={150}
                height={68}
                unoptimized={true}
                className={`${
                  isHomepage
                    ? sticky
                      ? "hidden dark:block"
                      : "block"
                    : sticky
                    ? "dark:block hidden"
                    : "dark:block hidden"
                }`}
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <div>
              <button
                onClick={() =>
                  setNavbarOpen(!navbarOpen)
                }
                className={`flex items-center gap-3 p-2 sm:px-5 sm:py-3 rounded-full font-semibold hover:cursor-pointer border ${
                  isHomepage
                    ? sticky
                      ? "text-white bg-dark dark:bg-white dark:text-dark dark:hover:text-white dark:hover:bg-dark hover:text-dark hover:bg-white border-dark dark:border-white"
                      : "text-dark bg-white dark:text-dark hover:bg-transparent hover:text-white border-white"
                    : "bg-dark text-white hover:bg-transparent hover:text-dark dark:bg-white dark:text-dark dark:hover:bg-transparent dark:hover:text-white duration-300"
                }`}
                aria-label="Toggle mobile menu"
              >
                <span>
                  <Icon
                    icon={"ph:list"}
                    width={24}
                    height={24}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="lg:flex w-full hidden items-center justify-between">
          <div className="w-2/5 flex items-center justify-between">
            {navLinks1.map((item, index) => (
              <NavLink
                key={index}
                item={item}
                onClick={() => {
                  return;
                }}
              />
            ))}
          </div>
          <div className="w-1/5 relative h-full">
            <div className="block align-middle">
              <Link href="/">
                <Image
                  src={"/images/header_logo.png"}
                  alt="logo"
                  width={150}
                  height={68}
                  unoptimized={true}  
                  className="absolute top-[-60px] left-[17%]"
                />
              </Link>
            </div>
          </div >
          <div className="w-2/5 flex items-center justify-between">
            {navLinks2.map((item, index) => (
              <NavLink
                key={index}
                item={item}
                onClick={() => {
                  return;
                }}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* === VỊ TRÍ 1 (DESKTOP) === */}
      <div className="lg:flex hidden absolute right-2 top-2 flex-col items-end gap-2">
        <LanguageSwitcher className="hidden text-white md:flex" />
        
        <Link
          href="https://vrclickstudio.vn/public/vr/soleil/"
          target="_blank"
          rel="noopener noreferrer"
          title="Xem VR 360"
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
        >
          <Image
            src="/images/icon-360.png" // <-- ĐÃ SỬA ĐƯỜNG DẪN NÀY
            alt="VR 360"
            width={28}
            height={28}
            className="h-7 w-7"
          />
        </Link>
      </div>
      {/* === KẾT THÚC SỬA === */}


      {navbarOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 lg:hidden" />
      )}

      {/* Menu slide-out (Mobile) */}
      <div
        ref={sideMenuRef}
        className={`fixed top-0 right-0 h-full w-full bg-dark shadow-lg transition-transform duration-300 max-w-2xl lg:hidden ${
          navbarOpen
            ? "translate-x-0"
            : "translate-x-full"
        } z-50 px-20 overflow-auto no-scrollbar`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="">
            <div className="flex items-center justify-start py-10">
              <button
                onClick={() =>
                  setNavbarOpen(false)
                }
                aria-label="Close mobile menu"
                className="bg-white p-3 rounded-full hover:cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col items-start gap-4">
              <ul className="w-full list-none">
                <li className="mt-6">
                  <LanguageSwitcher className="text-white" />
                </li>

                {/* === VỊ TRÍ 2 (MOBILE) === */}
                <li className="mt-4">
                  <Link
                    href="https://vrclickstudio.vn/public/vr/soleil/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                    onClick={() => setNavbarOpen(false)} // Đóng menu khi bấm
                  >
                    <Image
                      src="/images/icon-360.png" // <-- ĐÃ SỬA ĐƯỜNG DẪN NÀY
                      alt="VR 360"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                    <span className="text-lg font-medium uppercase">VR 360</span>
                  </Link>
                </li>
                {/* === KẾT THÚC SỬA === */}

                {[...navLinks1, ...navLinks2].map((item, index) => (
                  <NavLink
                    key={index}
                    item={item}
                    onClick={() =>
                      setNavbarOpen(false)
                    }
                  />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;