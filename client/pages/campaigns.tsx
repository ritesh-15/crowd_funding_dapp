import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Campaign, Loader } from "../components";
import DatabaseService from "../services/Db.service";
import { getCrowdFundingContractSigned } from "../utils/getCrowdFundingContract";

let eth: any = null;

if (typeof window !== "undefined") {
  const mywindow: any = window;
  eth = mywindow.ethereum;
}

export interface ICampaign {
  target: string;
  startAt: number;
  endAt: number;
  dataURL: string;
  address: string;
  meta: {
    name: string;
    story: string;
    title: string;
    amount: string;
    imageURL: string;
    websiteURL: string;
  };
}

const useCampaigns = () => {
  const [fetching, setFetching] = useState(false);
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  useEffect(() => {
    getCampaigns();
  }, [eth]);

  const getCampaigns = async () => {
    setFetching(true);
    const db = new DatabaseService();
    const { data } = await db.superbase.from("campaigns").select("*");
    if (data) {
      const serialized = await Promise.all(
        data.map(async (d) => {
          const metaData = await fetch(d.dataURL).then((res) => res.json());
          return { ...d, meta: metaData };
        })
      );
      setCampaigns(serialized);
    }
    setFetching(false);
  };

  return { campaigns, fetching };
};

export default function Campaigns() {
  const { campaigns, fetching } = useCampaigns();

  return (
    <section className="pt-[5rem] pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-nato font-bold">All campaigns</h1>
        <Link href="/create-campaign">
          <Button title="Create a campaign" className="px-2 py-3" />
        </Link>
      </div>
      {!fetching ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {campaigns.map((campaign) => {
            return (
              <Link
                key={campaign.address + campaign.dataURL}
                href={`/${campaign.address}`}
              >
                <Campaign campaign={campaign} />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="w-full sm:max-w-[350px] ">
            <div className="h-[250px] overflow dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="h-[1.5rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[75%] mt-4"></div>
            <div className="h-[1rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[50%] mt-2"></div>
          </div>
          <div className="w-full sm:max-w-[350px] ">
            <div className="h-[250px] overflow dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="h-[1.5rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[75%] mt-4"></div>
            <div className="h-[1rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[50%] mt-2"></div>
          </div>
          <div className="w-full sm:max-w-[350px] ">
            <div className="h-[250px] overflow dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="h-[1.5rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[75%] mt-4"></div>
            <div className="h-[1rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[50%] mt-2"></div>
          </div>
          <div className="w-full sm:max-w-[350px] ">
            <div className="h-[250px] overflow dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="h-[1.5rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[75%] mt-4"></div>
            <div className="h-[1rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[50%] mt-2"></div>
          </div>
          <div className="w-full sm:max-w-[350px] ">
            <div className="h-[250px] overflow dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="h-[1.5rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[75%] mt-4"></div>
            <div className="h-[1rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[50%] mt-2"></div>
          </div>
          <div className="w-full sm:max-w-[350px] ">
            <div className="h-[250px] overflow dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="h-[1.5rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[75%] mt-4"></div>
            <div className="h-[1rem] dark:bg-gray-700 rounded-md bg-gray-200 animate-pulse w-[50%] mt-2"></div>
          </div>
        </div>
      )}
    </section>
  );
}
