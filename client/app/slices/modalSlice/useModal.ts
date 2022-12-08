import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setOpen } from "./modalSlice";

export default function useModal() {
  const dispatch = useDispatch();
  const { open } = useSelector((state: RootState) => state.modal);

  const handleModalState = (open: boolean) => {
    dispatch(setOpen(open));
  };

  return { open, handleModalState };
}
