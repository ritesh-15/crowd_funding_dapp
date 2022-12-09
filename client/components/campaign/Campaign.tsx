import Image from "next/image";

export default function Campaign(): JSX.Element {
  return (
    <div className="w-full overflow-hidden max-w-[400px] rounded-md hover:shadow-lg transition cursor-pointer">
      <Image
        src="/images/home.jpg"
        className=""
        alt=""
        width={450}
        height={100}
      />
      <div className="px-3 py-4">
        <h1 className="text-lg font-semibold font-nato mt-2">Build a home</h1>
        <p className="font-nato font-light my-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          quibusdam!
        </p>
        <hr />
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="font-bold font-nato">0.02 ETH</span>
            <small className="font-nato">Raised of 1 ETH</small>
          </div>
          <div className="flex flex-col">
            <span className="font-bold font-nato">10</span>
            <small className="font-nato">Days Left</small>
          </div>
        </div>
        <div className="">
          <small className="font-nato font-light">created by</small>
          <div className="flex items-center mt-2">
            <Image
              width={25}
              height={25}
              alt=""
              src="https://avatars.dicebear.com/api/bottts/dfd.svg"
            />
            <p className="font-nato ml-2">457812222222</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-md mt-4">
          <div className="bg-primary w-[50%] h-[0.75rem] rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
