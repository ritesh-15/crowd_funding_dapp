import { ethers } from "ethers";
import { CROWD_FUNDING_CONTRACT_ADDRESS } from "../constants";
import { CROWD_FUNDING_ABI } from "../lib";

export const getCrowdFundingContract = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const contract = new ethers.Contract(
    CROWD_FUNDING_CONTRACT_ADDRESS,
    CROWD_FUNDING_ABI,
    provider
  );
  return contract;
};

export const getCrowdFundingContractSigned = (eth: any) => {
  const provider = new ethers.providers.Web3Provider(eth);
  const signers = provider.getSigner();
  const contract = new ethers.Contract(
    CROWD_FUNDING_CONTRACT_ADDRESS,
    CROWD_FUNDING_ABI,
    signers
  );
  return contract;
};
