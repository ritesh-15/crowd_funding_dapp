import moment from "moment";
import Image from "next/image";
import { ICampaign } from "../../pages/campaigns";
import { parseWalletAddress } from "../../utils/parseWalletAddress";

interface IPros {
  campaign?: ICampaign;
}

export default function CampainStats({ campaign }: IPros) {
  return (
    <div className="">
      <div className="flex justify-between gap-4 flex-col sm:flex-row">
        <div className="p-4 rounded-md flex items-center justify-center flex-1 dark:bg-gray-700 bg-gray-100 flex-col">
          <span className="text-xl font-nato">
            {campaign && moment(campaign?.endAt).fromNow(true)}
          </span>
          <small className="mt-2 font-nato text-[0.75rem]">Ending date</small>
        </div>
        <div className="p-4 rounded-md flex items-center flex-1  justify-center  dark:bg-gray-700 bg-gray-100 flex-col">
          <span className="text-xl font-nato">
            {campaign?.raisedAmount} ETH
          </span>
          <small className="mt-2 font-nato text-[0.75rem]">Raised amount</small>
        </div>
        <div className="p-4 rounded-md flex items-center flex-1  justify-center dark:bg-gray-700 bg-gray-100 flex-col">
          <span className="text-xl font-nato">{campaign?.target} ETH</span>
          <small className="mt-2 font-nato text-[0.75rem]">Target amount</small>
        </div>
      </div>
    </div>
  );
}
