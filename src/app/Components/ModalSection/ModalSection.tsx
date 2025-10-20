"use client";

import { useState } from "react";
import Modal from '../ModalSection/Modal';

export default function ModalSection() {
  const [isOpen, setIsOpen] = useState(false);

  let handleOpenModal = () => {
    setIsOpen(true);
  };

  let handleCloseModal = () => {
    setIsOpen(false);
  }

  return (
    <section className="p-6">
      <h2 className="text-center mb-2.5 text-2xl">This is a Modal component</h2>
      <div className="flex justify-center">
        <button
          className="rounded-2xl border-2 p-3.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
          onClick={handleOpenModal}
        >
          Click Here for Modal
        </button>
        <Modal modalopen={isOpen} closemodal={handleCloseModal}/>
      </div>
    </section>
  );
}
