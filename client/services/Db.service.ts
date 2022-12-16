import Superbase from "../utils/superbase";

interface ICreateCampaign {
  target: string;
  startAt: number;
  endAt: number;
  dataURL: string;
  address: string;
}

export interface ITransaction {
  sender_address: string;
  campaign_address: string;
  amount: number;
  type: string;
}

class DatabaseService {
  superbase = Superbase.get();

  createCampaign(data: ICreateCampaign) {
    return this.superbase.from("campaigns").insert(data).select();
  }

  createTransaction(data: ITransaction) {
    return this.superbase.from("transactions").upsert(data);
  }

  getTransactions(campaignAddress: string) {
    return this.superbase
      .from("transactions")
      .select("*")
      .eq("campaign_address", campaignAddress)
      .order("created_at", { ascending: false });
  }
}

export default DatabaseService;
