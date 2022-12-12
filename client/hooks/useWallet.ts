import { ethers } from "ethers";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userUser from "../app/slices/userSlice/userUser";

let eth: any = null;

if (typeof window !== "undefined") {
  const mywindow: any = window;
  eth = mywindow.ethereum;
}

export default function useWallet() {
  const { handleWalletAddress } = userUser();

  useEffect(() => {
    (async () => {
      if (eth == null)
        return toast.error(
          "Wallet not found please try again by reloading the window!"
        );
      const provider = new ethers.providers.Web3Provider(eth);
      const [address] = await provider.send("eth_accounts", []);
      handleWalletAddress(address);
    })();
  }, []);

  const connectWallet = async () => {
    if (eth == null)
      return toast.error(
        "Wallet not found please try again by reloading the window!"
      );
    const provider = new ethers.providers.Web3Provider(eth);
    const [address] = await provider.send("eth_requestAccounts", []);
    handleWalletAddress(address);
  };

  return { connectWallet };
}
