type CardProps = {
  name: string;
  text: string;
  imgSrc: string;
};

export const CardReview = ({ name, text }: CardProps) => {
  return (
    <div className="w-full lg:w-1/2">
      <div className="my-4 h-full rounded bg-[#333333] py-6 px-10 lg:p-6 pb-0">
        <img
          src="/icons/double-quotes-l.png"
          alt="Description of the image"
          className="absolute"
        />
        <p className="mb-2 mt-8 text-center">{text}</p>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-white p-2">
            <img
              src="/icons/user-line.png"
              alt="Description of the image"
              className=""
            />
          </div>
          <p className="text-center text-yellow-300">{name}</p>
        </div>
      </div>
    </div>
  );
};
