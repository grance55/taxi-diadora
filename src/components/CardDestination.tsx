type CardDestinationProps = {
  text: string;
  imgSrc: string;
};

export const CardDestination = ({ imgSrc, text }: CardDestinationProps) => {
  return (
    <div className="w-full lg:w-1/2">
      <div className="my-4 h-full rounded py-6 lg:p-6 pb-0">
        <img
          src={imgSrc}
          alt="Description of the image"
          className="w-full h-[170px] rounded"
        />
        <p className="text-lg my-2 text-center uppercase text-[#1B1B1B] font-bold">
          {text}
        </p>
      </div>
    </div>
  );
};
