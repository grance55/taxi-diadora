import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="fixed z-50 hidden w-full items-center justify-between bg-[#1B1B1B] px-10 py-7 text-white lg:flex">
        <p className="text-[28px] font-bold uppercase text-yellow-300">
          DIADORA
        </p>
        <div className="z-50 flex gap-8">
          <p className="font-bold uppercase">Početna</p>
          <p className="font-bold uppercase">Naše usluge</p>
          <p className="font-bold uppercase">Kontakt</p>
          <p className="font-bold uppercase">Home</p>
        </div>
      </div>

      <div className="fixed z-[9999999] w-full bg-[#1B1B1B] px-4 py-4 text-white lg:hidden">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold uppercase text-yellow-300">DIADORA</p>
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen((prevState) => !prevState);
            }}
            className="p-2"
          >
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
              minHeight: isMenuOpen ? "100%" : "0",
              width: "100%",
              opacity: isMenuOpen ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 0.3s ease, opacity 0.3s ease",
            }}
          >
            <div className="mt-[20px]">
              <p className="border-b border-gray-700 px-2 py-3 font-bold uppercase">
                Početna
              </p>
              <p className="border-b border-gray-700 px-2 py-3 font-bold uppercase">
                Naše usluge
              </p>
              <p className="border-b border-gray-700 px-2 py-3 font-bold uppercase">
                Kontakt
              </p>
              <p className="px-2 py-3 font-bold uppercase">Home</p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
