import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import userUser from "../app/slices/userSlice/userUser";
import { Button, CampainStats, Input, Transactions } from "../components";
import { FUNDED } from "../constants";
import DatabaseService from "../services/Db.service";
import {
  getCampaignContract,
  getCampaignContractSigned,
} from "../utils/getCampaignContract";
import { ICampaign } from "./campaigns";
import { FiLink } from "react-icons/fi";
import { parseWalletAddress } from "../utils/parseWalletAddress";

let eth: any = null;

if (typeof window !== "undefined") {
  const mywindow: any = window;
  eth = mywindow.ethereum;
}

const useCamapaign = () => {
  const router = useRouter();
  const [campaign, setCampaign] = useState<ICampaign>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [amount, setAmount] = useState("");
  const { walletAddress } = userUser();

  useEffect(() => {
    if (!router.query.id) return;
    getInfo(router.query.id as string);
  }, [router.query]);

  // get campaign info
  const getInfo = async (address: string) => {
    const contract = getCampaignContract(address);
    const db = new DatabaseService();

    setFetching(true);

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

    const { data } = await db.superbase
      .from("campaigns")
      .select("*")
      .eq("address", address);

    const metaData = await fetch(dataURI).then((res) => res.json());

    if (data) {
      setCampaign({
        ...data[0],
        meta: {
          ...metaData,
        },
        raisedAmount: ethers.utils.formatEther(raisedAmount.toString()),
        manager: manager,
      });
    }

    setFetching(false);
  };

  // fund campaign
  const fundCampaign = async () => {
    if (!campaign || !amount || !walletAddress) return;
    setLoading(true);
    try {
      const contract = getCampaignContractSigned(campaign.address, eth);
      const db = new DatabaseService();
      const tx = await contract.fund({
        value: ethers.utils.parseEther(`${amount}`),
      });
      await tx.wait();
      console.log(tx);
      await db.createTransaction({
        amount: Number(amount),
        sender_address: walletAddress,
        campaign_address: campaign.address,
        type: FUNDED,
        txhash: tx.hash,
      });

      // clear the amount
      setAmount("");
    } catch (error) {
      // @ts-ignore
      toast.error(
        "Something went wrong please try to refresh page or try again after some time!"
      );
    }
    setLoading(false);
  };

  return { campaign, fundCampaign, amount, setAmount, loading, fetching };
};

export default function Campaign() {
  const { campaign, fundCampaign, amount, setAmount, fetching } =
    useCamapaign();
  return (
    <>
      {fetching ? (
        <Skeleton />
      ) : (
        <section className="pt-[5rem]">
          <div className="w-full h-[350px] relative overflow-hidden rounded-md">
            <Image
              className="object-cover"
              src={campaign?.meta.imageURL || ""}
              fill
              alt=""
            />
          </div>
          <div className="flex justify-between py-4 mt-8 gap-8 flex-col md:flex-row">
            <div className="flex-1">
              <div className="flex flex-col gap-4 md:flex-row mb-4 justify-between border-b dark:border-gray-700 pb-4">
                <div className="">
                  <span className="mb-2 font-nato block font-light">
                    created by
                  </span>
                  <div className="flex items-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_AVATAR_API}/${campaign?.manager}.svg`}
                      alt=""
                      width={35}
                      height={35}
                    />
                    <p className="font-nato ml-2">
                      {parseWalletAddress(campaign?.manager || "")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center hover:text-primary cursor-pointer transition-all ">
                  <FiLink />
                  <p className="ml-2 font-nato">{campaign?.address}</p>
                </div>
              </div>
              <h1 className="font-bold font-nato text-3xl">
                {campaign?.meta.title}
              </h1>
              <p className="font-nato mt-2 leading-8">{campaign?.meta.story}</p>
            </div>
            <div className="flex-[1/3]">
              <CampainStats campaign={campaign} />

              {/* Fund Form */}
              <div className="mt-8">
                <h1 className="text-xl font-nato font-bold">Fund campaign</h1>
                <small className="text-[0.75rem]">
                  Note that once you fund the campaign you will not able to
                  refund until the deadline is reached.
                </small>
                <div className="mt-4">
                  <Input
                    type="number"
                    name=""
                    value={amount}
                    title="Amount to be fund"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </div>
                <Button
                  onClick={fundCampaign}
                  title="Fund Camapaign"
                  className="px-1 py-3 w-full"
                />
              </div>

              <Transactions address={campaign?.address} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

const Skeleton = () => {
  return (
    <div className="pt-[5rem]">
      <div className="h-[350px] dark:bg-gray-700 rounded-md bg-gray-100 animate-pulse" />
      <div className="h-[2rem] mt-4 w-[75%] dark:bg-gray-700 rounded-md bg-gray-100 animate-pulse" />
      <div className="h-[2rem] mt-4 w-[50%] dark:bg-gray-700 rounded-md bg-gray-100 animate-pulse" />
    </div>
  );
};
