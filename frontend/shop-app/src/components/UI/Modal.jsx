import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose }) {
  const dialog = useRef()

  useEffect(() => {
    if (dialog.current) {
      if (open) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    }

    return () => {
      if (dialog.current) {
        dialog.current.close();
      }
    };
  }, [open]);

  return createPortal(
    <dialog ref={dialog} onClose={onClose} className="bg-[rgb(156,140,121)] min-w-[30rem] h-max-[18rem] rounded-xl shadow-xl">{children}</dialog>,
    document.getElementById("modal")
  );
}
