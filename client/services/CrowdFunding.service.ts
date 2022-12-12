import { getCrowdFundingContractSigned } from "../utils/getCrowdFundingContract";

let eth: any = null;

if (typeof window !== "undefined") {
  const mywindow: any = window;
  eth = mywindow.ethereum;
}

interface ICreateCampaign {
  dataURL: string;
  startAt: number;
  endAt: number;
  target: number;
}

class CrowdFundingService {
  async create({ target, startAt, endAt, dataURL }: ICreateCampaign) {
    if (!eth) return;
    const contract = getCrowdFundingContractSigned(eth);
    const transaction = contract.createCampaign(
      target,
      startAt,
      endAt,
      dataURL
    );
    console.log(transaction);
  }
}

export default CrowdFundingService;
