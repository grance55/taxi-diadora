import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="fixed z-50 hidden w-full items-center justify-between bg-[#1B1B1B] px-10 py-7 text-white lg:flex">
        <a href="#top" className="flex gap-2 flex-row items-center">
          <img
            className="w-[22px] h-[22px]"
            src={"/icons/logo.png"}
            alt="Description of the image"
          />
          <p className="text-[22px] font-bold  text-yellow-300">
            DIADORA <span className="text-white">Zadar</span>
          </p>
        </a>
        <div className="z-50 flex gap-8 items-center">
          <a
            href="#bookNow"
            className="flex-1 bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold text-lg py-2 px-4 rounded transition duration-300 cursor-pointer"
          >
            {t("navbar-bookNow")}
          </a>
          <a href="#aboutUs" className="hover:text-yellow-300">
            <p className="font-bold uppercase">{t("navbar-aboutUs")}</p>
          </a>
          <a href="#reviews" className="hover:text-yellow-300">
            <p className="font-bold uppercase">{t("navbar-reviews")}</p>
          </a>
          <a href="#footer" className="hover:text-yellow-300">
            <p className="font-bold uppercase">{t("navbar-contact")}</p>
          </a>
          <button
            className="cursor-pointer"
            onClick={() => {
              changeLanguage("hr");
            }}
          >
            <img
              src={"/icons/hr.svg"}
              alt="Description of the image"
              className="w-[22px] h-[22px] inline-block"
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => {
              changeLanguage("en");
            }}
          >
            <img
              src={"/icons/en.svg"}
              alt="Description of the image"
              className="w-[22px] h-[22px] inline-block"
            />
          </button>
        </div>
      </div>

      <div className="fixed z-[9999999] w-full bg-[#1B1B1B] px-4 py-4 text-white lg:hidden">
        <div className="flex items-center justify-between">
          <a href="#top" className="flex gap-2 flex-row items-center">
            <img
              className="w-[22px] h-[22px]"
              src={"/icons/taxi-fill.png"}
              alt="Description of the image"
            />
            <p className="text-xl font-bold  text-yellow-300">
              DIADORA <span className="text-white">Zadar</span>
            </p>
          </a>

          <div className="flex items-center gap-4">
            <button
              className="cursor-pointer"
              onClick={() => {
                changeLanguage("hr");
              }}
            >
              <img
                src={"/icons/hr.svg"}
                alt="Description of the image"
                className="w-[22px] h-[22px] inline-block"
              />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => {
                changeLanguage("en");
              }}
            >
              <img
                src={"/icons/en.svg"}
                alt="Description of the image"
                className="w-[22px] h-[22px] inline-block"
              />
            </button>

            <button type="button" onClick={toggleMenu} className="p-2">
              <div className="relative h-6 w-6">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-6 bg-white transition-transform duration-300 ${
                    isMenuOpen ? "translate-y-2.5 rotate-45" : ""
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-2.5 h-0.5 w-6 bg-white transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-5 h-0.5 w-6 bg-white transition-transform duration-300 ${
                    isMenuOpen ? "-translate-y-2.5 -rotate-45" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
        {isMenuOpen ? (
          <div
            style={{
              minHeight: isMenuOpen ? "100vh" : "0",
              width: "100%",
              opacity: isMenuOpen ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 0.3s ease, opacity 0.3s ease",
            }}
          >
            <div className="mt-[20px]">
              <a
                href="#bookNow"
                className="hover:text-yellow-300"
                onClick={toggleMenu}
              >
                <p className="border-b border-gray-700 px-2 py-3 font-bold uppercase">
                  {t("navbar-bookNow")}
                </p>
              </a>
              <a
                href="#aboutUs"
                className="hover:text-yellow-300"
                onClick={toggleMenu}
              >
                <p className="border-b border-gray-700 px-2 py-3 font-bold uppercase">
                  {t("navbar-aboutUs")}
                </p>
              </a>
              <a
                href="#reviews"
                className="hover:text-yellow-300"
                onClick={toggleMenu}
              >
                <p className="border-b border-gray-700 px-2 py-3 font-bold uppercase">
                  {t("navbar-reviews")}
                </p>
              </a>
              <a
                href="#footer"
                className="hover:text-yellow-300"
                onClick={toggleMenu}
              >
                <p className=" border-b border-gray-700 px-2 py-3 font-bold uppercase">
                  {t("navbar-contact")}
                </p>
              </a>

              <button
                className="w-full font-bold uppercase px-2 py-3 border-b border-gray-700 text-left"
                onClick={() => {
                  changeLanguage("hr");
                  toggleMenu();
                }}
              >
                <img
                  src={"/icons/hr.svg"}
                  alt="Description of the image"
                  className="w-[22px] h-[22px] inline-block mr-2"
                />
                HR
              </button>
              <button
                className="font-bold uppercase px-2 py-3"
                onClick={() => {
                  changeLanguage("en");
                  toggleMenu();
                }}
              >
                <img
                  src={"/icons/en.svg"}
                  alt="Description of the image"
                  className="w-[22px] h-[22px] inline-block mr-2"
                />
                EN
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
