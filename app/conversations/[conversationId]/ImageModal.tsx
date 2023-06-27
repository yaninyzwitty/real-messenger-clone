"use client";

import Image from "next/image";
import Modal from "./Modal";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
};
function ImageModal({src, isOpen, onClose}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image src={src!} fill className="object-cover" alt="Image" />
      </div>
    </Modal>
  );
}

export default ImageModal;
