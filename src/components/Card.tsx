type CardProps = {
  title: string;
  text: string;
  imgSrc: string;
};

export const Card = ({ title, text, imgSrc }: CardProps) => {
  return (
    <div className="mb-4 w-full lg:w-1/2">
      <div className="m-4 h-full rounded bg-[#F5F5F5] p-10">
        <div className="mx-auto mb-6 max-w-fit rounded-full bg-yellow-300 p-4">
          <img src={imgSrc} alt="Description of the image" />
        </div>
        <p className="text-center text-[22px] font-bold">{title}</p>
        <p className="mt-6 text-center">{text}</p>
      </div>
    </div>
  );
};
