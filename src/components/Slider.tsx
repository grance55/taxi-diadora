import { useState, useEffect } from "react";

export default function Slider() {
  const slides = [
    {
      id: 1,
      image: "/images/car1.jpeg",
      alt: "Taxi Zadar",
    },
    {
      id: 2,
      image: "/images/car2.jpeg",
      alt: "Zadar airport taxi service",
    },
    {
      id: 3,
      image: "/images/car3.jpeg",
      alt: "Zadar taxi service",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [loadedImages, setLoadedImages] = useState<any>({});

  // Preload images for smoother transitions
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        setLoadedImages((prev: any) => ({
          ...prev,
          [slide.id]: true,
        }));
      };
    });
  }, []);

  const goToPrevious = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 50);
  };

  const goToNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 50);
  };

  const goToSlide = (slideIndex: number) => {
    if (isTransitioning || slideIndex === currentIndex) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex(slideIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 50);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[500px] overflow-hidden">
      {/* Slider container */}
      <div className="h-full relative">
        {/* Current slide */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.alt}
                className={`rounded object-contain w-full h-full transition-opacity duration-500 ${
                  loadedImages[slide?.id] ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <div
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-transparent bg-opacity-50 p-1 rounded-full cursor-pointer hover:bg-opacity-75 transition-all z-20 transform hover:scale-110"
        onClick={goToPrevious}
      >
        <img
          src="/icons/arrow-left-s-line.png"
          alt="Phone icon"
          className="w-[32px]"
        />
      </div>

      {/* Right Arrow */}
      <div
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-transparent bg-opacity-50 p-1 rounded-full cursor-pointer hover:bg-opacity-75 transition-all z-20 transform hover:scale-110"
        onClick={goToNext}
      >
        <img
          src="/icons/arrow-right-s-line.png"
          alt="Phone icon"
          className="w-[32px] text-black"
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            onClick={() => goToSlide(slideIndex)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === slideIndex
                ? "bg-[#1B1B1B] bg-opacity-50"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
