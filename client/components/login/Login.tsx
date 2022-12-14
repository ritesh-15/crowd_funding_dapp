import Image from "next/image";
import { useEffect } from "react";
import useModal from "../../app/slices/modalSlice/useModal";
import userUser from "../../app/slices/userSlice/userUser";
import useWallet from "../../hooks/useWallet";
import Button from "../button/Button";

export default function Login() {
  const { connectWallet } = useWallet();
  const { handleModalState } = useModal();
  const { walletAddress } = userUser();

  useEffect(() => {
    if (!walletAddress) return;
    handleModalState(false);
  }, [walletAddress]);

  return (
    <div className="">
      <h1 className="text-xl font-bold font-nato">
        Get onboard with one just one click!
      </h1>
      <p className="font-nato w-[75%] mt-2 font-light">
        Let's get started with cfunder, connect your meta mask to continue.
      </p>
      <Image
        src="/images/login.svg"
        width={300}
        height={200}
        alt=""
        className="mx-auto my-4"
      />
      <Button
        onClick={connectWallet}
        title="Connect Wallet"
        className="w-full mt-4 px-2 py-3"
      />
    </div>
  );
}
