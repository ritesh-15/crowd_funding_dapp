import Link from "next/link";
import { useEffect } from "react";
import { Button, Campaign } from "../components";
import { getCrowdFundingContract } from "../utils/getCrowdFundingContract";

let eth: any = null;

if (typeof window !== "undefined") {
  const mywindow: any = window;
  eth = mywindow.ethereum;
}

const useCampaigns = () => {
  useEffect(() => {
    getCampaigns();
  }, []);

  const getCampaigns = async () => {
    const contract = getCrowdFundingContract();
    const all = await contract.getCampaigns();
    console.log(all);
  };
};

export default function Campaigns() {
  useCampaigns();

  return (
    <section className="pt-[5rem] pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-nato font-bold">All campaigns</h1>
        <Link href="/create-campaign">
          <Button title="Create a campaign" className="px-2 py-3" />
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap flex-row gap-12">
        <Link href="/7">
          <Campaign />
        </Link>
        <Campaign />
        <Campaign />
        <Campaign />
        <Campaign />
        <Campaign />
      </div>
    </section>
  );
}
