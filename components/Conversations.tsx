"use client";
import useConversation from "@/hooks/useConversation";
import {MdOutlineGroupAdd} from "react-icons/md";
// import {ConversationType} from "@/typings";
import clsx from "clsx";
import {useRouter} from "next/navigation";
import {Conversation as ConversationTyped, User} from "@prisma/client";
import React, {useEffect, useMemo, useState} from "react";
import Conversation from "./Conversation";
import GroupChatModal from "./GroupChatModal";
import {useSession} from "next-auth/react";
import {pusherClient} from "@/app/lib/pusher";
import {FullConversationType} from "@/typings";
import {find} from "lodash";
type Props = {
  initialItems: ConversationTyped[];
  users: User[];
  title: string;
};
function Conversations({initialItems, users, title}: Props) {
  const [items, setItems] = useState(initialItems);
  const session = useSession();
  const [isModelOpen, setIsModelOpen] = useState(false);

  const router = useRouter();
  const {conversationId, isOpen} = useConversation();
  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);
  useEffect(() => {
    if (!pusherKey) return;
    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, {id: conversation.id})) {
          return current;
        }
        return [...current, conversation];
      });
    };
    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };
    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
      router.refresh();
      if (conversationId === conversation.id) {
        router.push(`/conversations`);
      }
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);
  return (
    <>
      <GroupChatModal
        isOpen={isModelOpen}
        users={users}
        onClose={() => setIsModelOpen(false)}
      />
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
          isOpen ? `hidden` : `block w-full left-0`
        )}
      >
        <div className="px-5">
          <div className="flex mb-4 pt-4 justify-between">
            <div className="text-2xl font-2xl text-neutral-800">Messages</div>
            <div
              className="rounded-full p-2 bg-gray-100 cursor-pointer transition hover:opacity-75 "
              onClick={() => setIsModelOpen(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items?.map((item) => (
            <Conversation
              key={item.id}
              // @ts-ignore
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
}

export default Conversations;
