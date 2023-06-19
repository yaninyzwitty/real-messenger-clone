import {  Conversation, Message, User } from "@prisma/client";



export type FullMessageType = Message & {
  sender: User, 
  seen: User[]
};



export type ConversationType = Conversation & {
    users: User[];
    messages: FullMessageType[];
}

export type FullConversationType = Conversation & { 
  users: User[]; 
  messages: FullMessageType[]
};