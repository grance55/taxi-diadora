import { useState, useEffect, useCallback, memo } from "react";

const images = [
  "/images/cover.jpg",
  "/images/cover2.jpg",
  "/images/cover4.jpg",
  "/images/cover3.jpg",
];

// Use memo to prevent unnecessary re-renders
const ImageCarousel = memo(() => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  // Memoize the image change function
  const changeImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  useEffect(() => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    if (!loadedImages.includes(nextIndex)) {
      const img = new Image();
      img.src = images[nextIndex];
      img.onload = () => {
        setLoadedImages((prev: number[]) => [...prev, nextIndex]);
      };
    }
  }, [currentImageIndex, loadedImages]);

  useEffect(() => {
    const img = new Image();
    img.src = images[0];
    img.onload = () => {
      setIsLoading(false);
      setLoadedImages([0]);
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(changeImage, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [changeImage, isLoading]);

  if (isLoading) {
    return <div className="w-full h-full bg-gray-200" />;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => {
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Background ${index + 1}`}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        );
      })}
    </div>
  );
});

export default ImageCarousel;
