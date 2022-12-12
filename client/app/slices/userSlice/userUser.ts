import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setEth, setWalletAddress } from "./userSlice";

export default function userUser() {
  const dispatch = useDispatch();
  const { walletAddress, isLoggedIn, eth } = useSelector(
    (state: RootState) => state.user
  );

  const handleEthState = (eth: any) => {
    dispatch(setEth(eth));
  };

  const handleWalletAddress = (address: string) =>
    dispatch(setWalletAddress(address));

  return {
    walletAddress,
    handleWalletAddress,
    isLoggedIn,
    handleEthState,
    eth,
  };
}
