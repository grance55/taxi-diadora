import "./App.css";
import { Card } from "./components/Card";
import { CardReview } from "./components/CardReview";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-w-screen flex h-full min-h-screen w-full flex-col bg-white text-black">
      {/* NAVBAR */}
      <Navbar />
      {/* NAVBAR END */}

      {/* COVER IMG */}
      <div className="inset-0 z-0 lg:mt-[98px] mt-[70px] lg:h-[calc(100vh-80px)] h-[calc(100vh-72px)]">
        <img
          src={"/public/images/cover.jpg"}
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={`absolute inset-0 z-10 lg:mt-[98px] mt-[70px] flex lg:h-[calc(100vh-80px)] h-[calc(100vh-72px)] flex-col items-center justify-center bg-black/30 text-white backdrop-blur-sm`}
      >
        <div className="max-w-[500px]">
          <p className="mb-8 text-[40px] font-bold leading-[50px] text-yellow-300 px-8">
            Vaš pouzdani prijevoz u Zadru i šire
          </p>
          <p className="mb-6 px-8">
            Get to your destination quickly and safely with our professional
            drivers and modern fleet. Book a ride in seconds!
          </p>
        </div>
      </div>
      {/* COVER IMG END */}

      {/* WHY CHOOSE US */}
      <div className="bg-white py-[100px]">
        <p className="text-center text-[32px] font-bold">Why Choose Us</p>
        <div className="mx-auto mt-[20px] h-1 w-[100px] bg-yellow-300"></div>

        <div className="mx-auto mt-[50px] flex max-w-[800px] flex-wrap">
          {/* Row 1 */}
          <div className="mb-4 flex w-full flex-col md:flex-row">
            <Card
              title="Fast Pickup"
              text="Our drivers arrive within minutes of your booking. No more waiting in the rain or
                  cold."
              imgSrc="/public/icons/time-line.png"
            />
            <Card
              title="Safety First"
              text="All our drivers are licensed professionals with years of experience and clean records."
              imgSrc="/public/icons/shield-cross-line.png"
            />
          </div>

          {/* Row 2 */}
          <div className="mb-4 flex w-full flex-col md:flex-row">
            <Card
              title="Fair Pricing"
              text="Transparent pricing with no hidden costs. Pay only for what you see in the app."
              imgSrc="/public/icons/money-euro-circle-line.png"
            />
            <Card
              title="Modern Fleet"
              text="Choose from our range of clean, comfortable, and well-maintained vehicles."
              imgSrc="/public/icons/taxi-line.png"
            />
          </div>

          {/* Row 3 */}
          <div className="mb-4 flex w-full">
            <Card
              title="24/7 Support"
              text="Our customer service team is available around the clock to assist you."
              imgSrc="/public/icons/time-line.png"
            />
          </div>
        </div>
      </div>
      {/* WHY CHOOSE US END */}

      {/* REVIEW */}
      <div className="bg-[#1B1B1B] py-[100px] text-white">
        <p className="text-center text-[32px] font-bold">
          What Our Customer Say
        </p>
        <div className="mx-auto mt-[20px] h-1 w-[100px] bg-yellow-300"></div>

        <div className="mx-auto mt-[50px] flex max-w-[1000px] flex-wrap px-4">
          {/* Row 1 */}
          <div className="flex w-full flex-col gap-8 md:flex-row">
            <CardReview
              text="Swift Taxi has been my go-to for transportation for over a year now. The drivers are always professional and their cars are clean. I've never had to wait more than 5 minutes for a pickup!"
              name="Sarah Johnson"
              imgSrc="public/icons/time-line.png"
            />
            <CardReview
              text="As a business traveler, I need reliable transportation. Swift Taxi's corporate account service has saved me so much time and hassle. Their drivers know the city inside out!"
              name="Robert Mitchell"
              imgSrc="public/icons/shield-cross-line.png"
            />
            <CardReview
              text="I used Swift Taxi for my wedding day transportation and they exceeded all expectations. The premium sedans were immaculate and our guests were all picked up on time."
              name="Emma Lee"
              imgSrc="public/icons/time-line.png"
            />
          </div>
        </div>
      </div>
      {/* REVIEW END */}

      {/* FOOTER */}
      <div className="bg-[#1B1B1B] px-6 pb-10 pt-28 text-white">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-14 pb-24 lg:flex-row">
          <div className="w-full">
            <p className="mb-[40px] border-b-[1px] border-yellow-300 pb-[10px] text-lg font-bold uppercase">
              Diadira Taxi
            </p>
            <p className="text-[#ADADAD]">
              Rezervirajte taksi prijevoz iz udobnosti svog doma. Jednim klikom
              možete rezervirati taxi vožnju ili transfer super cijenama. Naše
              vozilo i vozač će Vas dočekati na željenoj destinaciji.
            </p>
          </div>
          <div className="min-w-[200px]">
            <p className="mb-[40px] border-b-[1px] border-yellow-300 pb-[10px] text-lg font-bold uppercase">
              usluge
            </p>
            <p className="my-4 font-bold uppercase">taxi prijevoz</p>
            <p className="my-4 font-bold uppercase">transferi</p>
            <p className="my-4 font-bold uppercase">prijevoz kucnog ljubimca</p>
            <p className="my-4 font-bold uppercase">slanje paketa</p>
          </div>
          <div className="w-full">
            <p className="mb-[40px] border-b-[1px] border-yellow-300 pb-[10px] text-lg font-bold uppercase">
              kontakt
            </p>
            <p className="font-bold uppercase">mobitel</p>
            <div className="mt-2 flex items-center">
              <div className="mr-4 bg-yellow-300 p-1">
                <img
                  src={"/public/icons/phone-line.png"}
                  alt="Description of the image"
                  className="text-yellow-300"
                />
              </div>
              <p className="">095876 3084</p>
            </div>

            <p className="mt-4 font-bold uppercase">email</p>
            <div className="mt-2 flex items-center">
              <div className="mr-4 bg-yellow-300 p-1">
                <img
                  src={"/public/icons/mail-line.png"}
                  alt="Description of the image"
                  className="text-yellow-300"
                />
              </div>
              <p className="">taxi.diadora1@gmail.com</p>
            </div>

            <p className="mt-4 font-bold uppercase">radno vrijeme</p>
            <div className="mt-2 flex items-center">
              <div className="mr-4 bg-yellow-300 p-1">
                <img
                  src={"/public/icons/time-line.png"}
                  alt="Description of the image"
                  className="text-yellow-300"
                />
              </div>
              <p className="">0 - 24</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1B1B1B] p-6">
        <div className="h-[1px] w-full bg-[#ADADAD]"></div>
        <p className="pt-[10px] text-center text-sm text-[#ADADAD]">
          © 2025 TAXI DIADORA. All Rights Reserved.
        </p>
      </div>
      {/* FOOTER END */}

      <a
        // href={isMobile ? 'whatsapp://send?phone=1234567890' : 'https://wa.me/1234567890'}
        href={"https://wa.me/1234567890"}
        className="fixed bottom-8 right-4 z-[99999] rounded-full border-none bg-[white] p-3 shadow-2xl lg:right-8 lg:p-4"
      >
        <img
          src="/icons/whatsapp-line.png"
          alt="Description of the image"
          className="w-[42px]"
        />
      </a>

      <button className="fixed bottom-28 right-4 z-[99999] rounded-full border-none bg-[#25D366] p-3 shadow-2xl lg:bottom-32 lg:right-8 lg:p-4">
        <img
          src={"/public/icons/phone-line-white.png"}
          alt="Description of the image"
          className="w-[42px]"
        />
      </button>
    </div>
  );
}

export default App;
