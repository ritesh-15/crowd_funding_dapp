import { ReactNode, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useModal from "../../app/slices/modalSlice/useModal";

interface IProps {
  children: ReactNode;
}

export default function Modal({ children }: IProps) {
  const { open, handleModalState } = useModal();
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", (e: MouseEvent) => {
      if (e.target == ref.current) handleModalState(false);
    });

    return () => {
      document.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full min-h-screen fixed top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] transition ${
        open ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="dark:bg-darkBg bg-white p-4 shadow-lg relative rounded-md">
        <div className="right-2 top-2 hidden md:visible absolute">
          <AiOutlineClose
            onClick={() => handleModalState(false)}
            className="text-2xl cursor-pointer"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
