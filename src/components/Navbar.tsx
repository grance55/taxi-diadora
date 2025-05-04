import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayLanguageModal, setDisplayLanguageModal] = useState(false);
  const currentLanguage = i18n.language;

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
            src={"/icons/taxi-fill.png"}
            alt="Description of the image"
          />
          <p className="text-[28px] font-bold uppercase text-yellow-300">
            DIADORA
          </p>
        </a>
        <div className="z-50 flex gap-8">
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
            className="hover:text-yellow-300 flex font-bold uppercase items-center"
            type="button"
            onClick={() => setDisplayLanguageModal((prevState) => !prevState)}
          >
            {currentLanguage}{" "}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
        </div>
      </div>

      {displayLanguageModal ? (
        <div className="fixed top-[70px] right-[30px] bg-yellow-300 z-[99999] flex flex-col  rounded">
          <button
            className="px-8 py-2  hover:bg-[#F5F5F5] rounded"
            onClick={() => {
              changeLanguage("hr");
              setDisplayLanguageModal(false);
            }}
          >
            Hrvatski
          </button>
          <button
            className="px-8 py-2 hover:bg-[#F5F5F5] rounded"
            onClick={() => {
              changeLanguage("en");
              setDisplayLanguageModal(false);
            }}
          >
            English
          </button>
        </div>
      ) : null}

      <div className="fixed z-[9999999] w-full bg-[#1B1B1B] px-4 py-4 text-white lg:hidden">
        <div className="flex items-center justify-between">
          <a href="#top" className="flex gap-2 flex-row items-center">
            <img
              className="w-[22px] h-[22px]"
              src={"/icons/taxi-fill.png"}
              alt="Description of the image"
            />
            <p className="text-xl font-bold uppercase text-yellow-300">
              DIADORA
            </p>
          </a>

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
                  setDisplayLanguageModal(false);
                  toggleMenu();
                }}
              >
                HR
              </button>
              <button
                className="font-bold uppercase px-2 py-3"
                onClick={() => {
                  changeLanguage("en");
                  setDisplayLanguageModal(false);
                  toggleMenu();
                }}
              >
                EN
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
