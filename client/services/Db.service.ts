import Superbase from "../utils/superbase";

interface ICreateCampaign {
  target: string;
  startAt: number;
  endAt: number;
  dataURL: string;
  address: string;
}

class DatabaseService {
  superbase = Superbase.get();
  createCampaign(data: ICreateCampaign) {
    return this.superbase.from("campaigns").insert(data).select();
  }
}

export default DatabaseService;
