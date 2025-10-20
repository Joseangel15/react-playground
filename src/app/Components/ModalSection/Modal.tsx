'use client';

import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";

interface MySectionProps extends React.HTMLAttributes<HTMLDivElement> {
  modalopen: boolean;
  closemodal: () => void;
}

export default function Modal(props: MySectionProps) {
  const { modalopen, closemodal, ...restProps } = props;
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const mainModal = useRef<Element | null>(null);

  useEffect(() => {

    if(typeof document !== 'undefined'){
        setModalRoot(document.getElementById("modal-root"));
        mainModal.current = document.querySelector('.modal-main');
    }

    if (!modalopen || !modalRef.current) return;

    const closeButton = modalRef.current.querySelector(
      "button"
    ) as HTMLButtonElement | null;
    closeButton?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closemodal();
      }

      if (e.key === "Tab") {
        e.preventDefault();
        closeButton?.focus();
      }
    };
    
    const handleClickOnModalBackground = (e: MouseEvent) => {
      if (e.target === modalRef.current) {
        e.preventDefault();
        closemodal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOnModalBackground);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOnModalBackground);
    };
  }, [modalopen, closemodal]);

  if (!props.modalopen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      {...restProps}
      className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
      ref={modalRef}
    >
      <div className="modal-main bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full flex flex-col">
        <p className="text-black mb-5">
          This modal has no important information and it was created for
          teaching purposes. Please disregard and continue on your journey to
          React enlightenment.
        </p>
        <button
          onClick={closemodal}
          className="text-black rounded-2xl border-2 p-3.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 hover:text-white focus:outline"
        >
          Close Modal
        </button>
      </div>
    </div>,
    modalRoot ?? document.body
  );
}
