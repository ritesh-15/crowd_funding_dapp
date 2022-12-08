import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setWalletAddress } from "./userSlice";

export default function userUser() {
  const dispatch = useDispatch();
  const { walletAddress, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  const handleWalletAddress = (address: string) =>
    dispatch(setWalletAddress(address));

  return { walletAddress, handleWalletAddress, isLoggedIn };
}
