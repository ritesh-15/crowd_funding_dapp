import { ethers } from "ethers";
import { CAMPAIGN_ABI } from "../lib";

export const getCampaignContract = (address: string) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const contract = new ethers.Contract(address, CAMPAIGN_ABI, provider);
  return contract;
};

export const getCampaignContractSigned = (address: string, eth: any) => {
  const provider = new ethers.providers.Web3Provider(eth);
  const signers = provider.getSigner();
  const contract = new ethers.Contract(address, CAMPAIGN_ABI, signers);
  return contract;
};
