"use client";

import useConversation from "@/hooks/useConversation";
import {FullConversationType, FullMessageType} from "@/typings";
import {useEffect, useRef, useState} from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

type Props = {
  initialMessages: FullMessageType[];
};
function Body({initialMessages}: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {conversationId} = useConversation();

  useEffect(() => {
    axios.post(`/api/conversation/${conversationId}/seen`);
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
