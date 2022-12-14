import Image from "next/image";
import { useEffect, useState } from "react";
import { ICampaign } from "../../pages/campaigns";
import { getCampaignContract } from "../../utils/getCampaignContract";
import { parseWalletAddress } from "../../utils/parseWalletAddress";
import moment from "moment";
import { ethers } from "ethers";
interface IProps {
  campaign: ICampaign;
}

interface ICamp {
  raisedAmount: string;
  manager: string;
}

const getWidthPercentage = (raised: string, target: string) => {
  const a = Number(raised);
  const b = Number(target);
  const width = Math.floor((a / b) * 100).toString();
  return `w-[${width}%]`;
};

const useCampaign = (address: string) => {
  const [info, setInfo] = useState<ICamp>();

  useEffect(() => {
    getInfo(address);
  }, [address]);

  const getInfo = async (address: string) => {
    const contract = getCampaignContract(address);
    const [
      manager,
      startAt,
      endAt,
      target,
      raisedAmount,
      dataURI,
      noOfContributors,
      minContribution,
    ] = await contract.getInfo();
    setInfo({
      manager,
      raisedAmount: ethers.utils.formatEther(raisedAmount.toString()),
    });
  };

  return { info };
};

export default function Campaign({ campaign }: IProps): JSX.Element {
  const { info } = useCampaign(campaign.address);

  return (
    <div className="w-full sm:max-w-[350px] overflow-hidden rounded-md hover:shadow-lg transition cursor-pointer">
      <div className="w-full relative h-[250px] overflow-hidden z-1">
        <Image
          fill
          src={campaign.meta.imageURL}
          className="object-cover"
          alt=""
          loading="lazy"
        />
      </div>
      <div className="px-3 pt-1 pb-4">
        <h1 className="text-lg font-semibold font-nato mt-2">
          {campaign.meta.title}
        </h1>
        <div className="my-1 max-h-[1.5rem] text-ellipsis overflow-hidden">
          <p className="font-nato font-light whitespace-nowrap text-ellipsis overflow-hidden">
            {campaign.meta.story}
          </p>
        </div>
        <hr />
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="font-bold font-nato">
              {info?.raisedAmount} ETH
            </span>
            <small className="font-nato">Raised of {campaign.target} ETH</small>
          </div>
          <div className="flex flex-col">
            <span className="font-bold font-nato">
              {moment(campaign.endAt).fromNow(true)}
            </span>
            <small className="font-nato">Left</small>
          </div>
        </div>
        <div className="">
          <small className="font-nato font-light">created by</small>
          <div className="flex items-center mt-2">
            <Image
              width={25}
              height={25}
              alt=""
              src={`${process.env.NEXT_PUBLIC_AVATAR_API}/${info?.manager}.svg`}
            />
            <p className="font-nato ml-2">
              {info && parseWalletAddress(info?.manager)}
            </p>
          </div>
        </div>
        <div className="w-full relative bg-gray-200 dark:bg-gray-700 rounded-md mt-4">
          {info && (
            <div
              className={`bg-primary ${getWidthPercentage(
                info?.raisedAmount,
                campaign.target
              )} h-[0.75rem] rounded-md absolute top-0 bottom-0`}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
