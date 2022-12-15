import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatabaseService from "../services/Db.service";
import { getCampaignContract } from "../utils/getCampaignContract";
import { ICampaign } from "./campaigns";

const useCamapaign = () => {
  const router = useRouter();
  const [campaign, setCampaign] = useState<ICampaign>();

  useEffect(() => {
    if (!router.query.id) return;
    getInfo(router.query.id as string);
  }, [router.query]);

  const getInfo = async (address: string) => {
    const contract = getCampaignContract(address);
    const db = new DatabaseService();

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
      });
    }
  };

  return { campaign };
};

export default function Campaign() {
  const { campaign } = useCamapaign();
  return (
    <section className="pt-[5rem]">
      <div className="w-full h-[350px] relative overflow-hidden rounded-md">
        <Image
          className="object-cover"
          src={campaign?.meta.imageURL || ""}
          fill
          alt=""
        />
      </div>
      <div className="flex justify-between py-4 mt-8 gap-8">
        <div className="flex-1">
          <h1 className="font-bold font-nato text-3xl">
            {campaign?.meta.title}
          </h1>
          <p className="font-nato mt-2 leading-8">{campaign?.meta.story}</p>
        </div>
        <div className="flex-1">
          <div className="">
            <span>{campaign && moment(campaign?.endAt).fromNow(true)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
