import { ethers } from "ethers";
import { useEffect } from "react";
import userUser from "../app/slices/userSlice/userUser";
import Superbase from "../utils/superbase";

let eth: any = null;

if (typeof window !== "undefined") {
  const mywindow: any = window;
  eth = mywindow.ethereum;
}

export default function useWallet() {
  const { handleWalletAddress } = userUser();
  const superbase = Superbase.get();

  useEffect(() => {
    (async () => {
      if (eth == null) return;
      const provider = new ethers.providers.Web3Provider(eth);
      const [address] = await provider.send("eth_accounts", []);
      findInDbOrCreate(address);
      handleWalletAddress(address);
    })();
  }, []);

  const connectWallet = async () => {
    if (eth == null) return;
    const provider = new ethers.providers.Web3Provider(eth);
    const [address] = await provider.send("eth_requestAccounts", []);

    findInDbOrCreate(address);

    handleWalletAddress(address);
  };

  const findInDbOrCreate = async (address: string) => {
    try {
      const result = await superbase
        .from("users")
        .select()
        .eq("wallet", address)
        .single();

      console.log(result);

      if (result.data == null) {
        const user = await superbase.from("users").insert({ wallet: address });
        console.log(user);
      }
    } catch (e) {
      // @ts-ignore
    }
  };

  return { connectWallet };
}
