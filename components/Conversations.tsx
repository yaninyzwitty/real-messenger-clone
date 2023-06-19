"use client";
import useConversation from "@/hooks/useConversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import { ConversationType } from "@/typings";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Conversation as ConversationTyped } from "@prisma/client";
import React, { useState } from "react";
import Conversation from "./Conversation";
type Props = {
  initialItems: ConversationTyped[];
};
function Conversations({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();
  return (
    <aside
      className={clsx(
        `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
        isOpen ? `hidden` : `block w-full left-0`
      )}
    >
      <div className="px-5">
        <div className="flex mb-4 pt-4 justify-between">
          <div className="text-2xl font-2xl text-neutral-800">Messages</div>
          <div className="rounded-full p-2 bg-gray-100 cursor-pointer transition hover:opacity-75 ">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items?.map((item) => (
          <Conversation
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
}

export default Conversations;
