"use client";
import {FiAlertTriangle} from "react-icons/fi";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import {toast} from "react-hot-toast";
import Modal from "./Modal";
import {Dialog} from "@headlessui/react";
import Button from "@/components/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function ConfirmModal({isOpen, onClose}: Props) {
  const router = useRouter();
  const {conversationId} = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  // console.log(conversationId);
  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push(`/conversations`);
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong!!"))
      .finally(() => setIsLoading(true));
  }, [conversationId, router, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 justify-center flex-shrink-0 items-center rounded-full bg-red-100 sm:mx-0 sm:h-0 sm:w-10">
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ">
          <Dialog.Title
            as="h3"
            className="text-base leading-6 font-semibold text-gray-900"
          >
            Delete Conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="test-sm text-gray-500">
              Are you sure you want to delete this conversation? This acion cant
              be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
export default ConfirmModal;
