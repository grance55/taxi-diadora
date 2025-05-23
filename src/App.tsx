import "./App.css";
import { Card } from "./components/Card";
import { CardReview } from "./components/CardReview";
import Navbar from "./components/Navbar";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "./helpers/useWindowSize";
import { CardDestination } from "./components/CardDestination";
import EmailContactForm from "./components/EmailContactForm";
import emailjs from "@emailjs/browser";
import { Suspense, lazy, useEffect } from "react";
import Slider from "./components/Slider";

const ImageCarousel = lazy(() => import("./components/ImageCarousel"));

function App() {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  return (
    <div
      id="top"
      className="min-w-screen flex h-full min-h-screen w-full flex-col bg-white text-black"
    >
      <Navbar />

      <div className="inset-0 z-0 lg:mt-[98px] mt-[70px] lg:h-[calc(100vh-80px)] h-[calc(100vh-72px)]">
        <Suspense fallback={<div className="h-full w-full bg-gray-200" />}>
          <ImageCarousel />
        </Suspense>
      </div>

      <div className="absolute inset-0 z-10 lg:mt-[98px] mt-[70px] flex lg:h-[calc(100vh-80px)] h-[calc(100vh-72px)] flex-col items-center justify-center bg-black/30 text-white backdrop-blur-sm">
        <div className="max-w-[500px]">
          <p className="mb-8 text-[40px] font-bold leading-[50px] text-yellow-300 px-8">
            {t("headline_overlay")}
          </p>
          <p className="mb-6 px-8">{t("subtext_overlay")}</p>
        </div>
      </div>

      <div id="aboutUs" className="bg-white py-[100px]">
        <p className="text-center text-[32px] font-bold">
          {t("why_choose_us")}
        </p>
        <div className="mx-auto mt-[20px] h-1 w-[100px] bg-yellow-300"></div>

        <div className="mx-auto mt-[50px] flex max-w-[800px] flex-wrap px-4">
          <div className="mb-4 flex w-full flex-col md:flex-row lg:gap-0 gap-4">
            <Card
              title={t("card_1_title")}
              text={t("card_1_text")}
              imgSrc="/icons/time-line.png"
            />
            <Card
              title={t("card_2_title")}
              text={t("card_2_text")}
              imgSrc="/icons/shield-cross-line.png"
            />
          </div>

          <div className="mb-4 flex w-full flex-col md:flex-row lg:gap-0 gap-4">
            <Card
              title={t("card_3_title")}
              text={t("card_3_text")}
              imgSrc="/icons/money-euro-circle-line.png"
            />
            <Card
              title={t("card_4_title")}
              text={t("card_4_text")}
              imgSrc="/icons/taxi-line.png"
            />
          </div>

          <div className="mb-4 flex w-full">
            <Card
              title={t("card_5_title")}
              text={t("card_5_text")}
              imgSrc="/icons/time-line.png"
            />
          </div>
        </div>
      </div>

      <div id="bookNow" className="bg-yellow-300 py-[100px] flex">
        <div className="mx-4 md:mx-auto flex max-w-[800px] flex-col items-center justify-center gap-8 px-4 text-black lg:flex-row">
          <div className="max-w-[400px]">
            <p className="text-[32px] font-bold mb-[20px]">
              {t("book_now_title")}
            </p>
            <p>{t("book_now_text")}</p>
            <p className="mt-[30px] text-[12px]">{t("country_code")}</p>
            <p className="mt-[30px] text-[12px]">{t("field_required")}</p>
          </div>
          <EmailContactForm />
        </div>
      </div>

      <div id="destinations" className=" py-[100px] text-white">
        <p className="text-center text-[32px] font-bold text-[#1B1B1B]">
          {t("destinations_title")}
        </p>
        <div className="mx-auto mt-[20px] h-1 w-[100px] bg-[#1B1B1B]"></div>

        <div className="mx-auto mt-[50px] flex max-w-[1000px] flex-wrap px-8 lg:px-4">
          <div className="flex w-full flex-col gap-8 md:flex-row">
            <CardDestination text={t("airports")} imgSrc="/images/pista.jpg" />
            <CardDestination text={t("marine")} imgSrc="/images/marina.png" />
            <CardDestination
              text={t("festivals")}
              imgSrc="/images/festival.jpg"
            />
          </div>
          <div className="flex flex-col gap-8 md:flex-row mt-8 lg:mx-auto w-full lg:w-auto">
            <CardDestination text={t("cities")} imgSrc="/images/gradovi.jpg" />
            <CardDestination
              text={t("national_parks")}
              imgSrc="/images/priroda.jpg"
            />
          </div>
        </div>
      </div>

      <div id="reviews" className="bg-[#1B1B1B] py-[100px] text-white">
        <p className="text-center text-[32px] font-bold">
          {t("customer_reviews_title")}
        </p>
        <div className="mx-auto mt-[20px] h-1 w-[100px] bg-yellow-300"></div>

        <div className="mx-auto mt-[50px] flex max-w-[1000px] flex-wrap px-8 lg:px-4">
          <div className="flex w-full flex-col gap-8 md:flex-row">
            <CardReview
              text={t("review_1_text")}
              name={t("review_1_name")}
              imgSrc="/icons/time-line.png"
            />
            <CardReview
              text={t("review_2_text")}
              name={t("review_2_name")}
              imgSrc="/icons/shield-cross-line.png"
            />
            <CardReview
              text={t("review_3_text")}
              name={t("review_3_name")}
              imgSrc="/icons/time-line.png"
            />
          </div>
        </div>
      </div>

      <div id="fleet" className="bg-[#F5F5F5] py-[100px]">
        <p className="text-center text-[32px] font-bold">{t("fleet_title")}</p>
        <div className="mx-auto mt-[20px] h-1 w-[100px] bg-yellow-300"></div>
        <p className="text-center mt-[10px] mb-[40px]">{t("fleet_text")}</p>

        <Slider />
      </div>

      <div className="bg-[#1B1B1B] px-6 pb-10 pt-28 text-white text-center lg:text-start">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-14 pb-24 lg:flex-row">
          <div className="w-full">
            <p className="mb-[40px] border-b-[1px] border-yellow-300 pb-[10px] text-lg font-bold uppercase">
              {t("footer_company")}
            </p>
            <p className="text-[#ADADAD]">{t("footer_description")}</p>
          </div>
          <div className="min-w-[200px]">
            <p className="mb-[40px] border-b-[1px] border-yellow-300 pb-[10px] text-lg font-bold uppercase">
              {t("footer_services_title")}
            </p>
            <p className="my-4 font-bold uppercase">{t("footer_services_1")}</p>
            <p className="my-4 font-bold uppercase">{t("footer_services_2")}</p>
            {/* <p className="my-4 font-bold uppercase">{t("footer_services_3")}</p> */}
            <p className="my-4 font-bold uppercase">{t("footer_services_4")}</p>
          </div>
          <div className="w-full">
            <p className="mb-[40px] border-b-[1px] border-yellow-300 pb-[10px] text-lg font-bold uppercase">
              {t("footer_contact")}
            </p>
            <p className="font-bold uppercase text-start">
              {t("footer_mobile")}
            </p>
            <div className="mt-2 flex items-center">
              <div className="mr-4 bg-yellow-300 p-1">
                <img
                  src="/icons/phone-line.png"
                  alt="Phone icon"
                  className="text-yellow-300"
                />
              </div>
              <p>+385 95 876 3084</p>
            </div>

            <p className="font-bold uppercase text-start mt-4">
              {t("footer_email")}
            </p>
            <div className="mt-2 flex items-center">
              <div className="mr-4 bg-yellow-300 p-1">
                <img
                  src="/icons/mail-line.png"
                  alt="Mail icon"
                  className="text-yellow-300"
                />
              </div>
              <p>taxi.diadora1@gmail.com</p>
            </div>

            <p className="font-bold uppercase text-start mt-4">
              {t("footer_working_hours")}
            </p>
            <div className="mt-2 flex items-center">
              <div className="mr-4 bg-yellow-300 p-1">
                <img
                  src="/icons/time-line.png"
                  alt="Clock icon"
                  className="text-yellow-300"
                />
              </div>
              <p>0 - 24</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1B1B1B] p-6" id="footer">
        <div className="h-[1px] w-full bg-[#ADADAD]"></div>
        <p className="pt-[10px] text-center text-sm text-[#ADADAD]">
          {t("footer_copyright")}
        </p>
      </div>

      <a
        href={
          width && width <= 768
            ? "whatsapp://send?phone=+385958763084"
            : "https://wa.me/+385958763084"
        }
        className="fixed bottom-8 right-4 z-[99999] rounded-full border-none bg-[white] p-3 shadow-2xl lg:right-8 lg:p-4"
      >
        <img
          src="/icons/whatsapp-line.png"
          alt="WhatsApp icon"
          className="w-[42px]"
        />
      </a>
      <a
        href="tel:+385958763084"
        className="fixed bottom-28 right-4 z-[99999] rounded-full border-none bg-[#25D366] p-3 shadow-2xl lg:bottom-32 lg:right-8 lg:p-4"
      >
        <img
          src="/icons/phone-line-white.png"
          alt="Phone icon"
          className="w-[42px]"
        />
      </a>
    </div>
  );
}

export default App;
