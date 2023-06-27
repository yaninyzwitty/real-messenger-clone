"use client";

import useConversation from "@/hooks/useConversation";
import {FullConversationType, FullMessageType} from "@/typings";
import {useEffect, useRef, useState} from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import {pusherClient} from "@/app/lib/pusher";
import {Message} from "@prisma/client";
import {find} from "lodash";

type Props = {
  initialMessages: FullMessageType[];
};
function Body({initialMessages}: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {conversationId}: any = useConversation();

  useEffect(() => {
    axios.post(`/api/conversation/${conversationId}/seen`);
  }, [conversationId]);
  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      setMessages((current) => {
        if (find(current, {id: message.id})) {
          return current;
        }
        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
    };
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
      //  currentMessage.id === newMessage.id ? newMessage : currentMessage
    };
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.map((message, index) => (
        <MessageBox
          key={message.id}
          isLast={index === messages.length - 1}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
}

export default Body;
