import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open }) {
  const dialog = useRef()

  useEffect( () => {
    if(open){
      dialog.current.showModal();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className="bg-[rgb(156,140,121)] w-[30rem] h-[12rem] rounded-xl shadow-xl">{children}</dialog>,
    document.getElementById("modal")
  );
}
