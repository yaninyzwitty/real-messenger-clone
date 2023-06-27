import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/prismadb";
import { pusherServer } from "@/app/lib/pusher";

interface Props  {

        conversationId?: string;
    

}


export async function DELETE(
    request: Request,
    { params }: { params: Props }
  ) {
    try {
      const { conversationId } = params;
      console.log(conversationId)
      const currentUser = await getCurrentUser();
      console.log(currentUser)
  
      if (!currentUser?.id) {
        return NextResponse.json(null);
      }
  
      const existingConversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId
        },
        include: {
          users: true
        }
      });
  
      if (!existingConversation) {
        return new NextResponse('Invalid ID', { status: 400 });
      }
  
      const deletedConversation = await prisma.conversation.deleteMany({
        where: {
          id: conversationId,
          userIds: {
            hasSome: [currentUser.id]
          },
        },
      });


      existingConversation.users.forEach((user) => {
        if(user.email) {
          pusherServer.trigger(user.email, 'conversation-remove', existingConversation)
        }
      })
  
      
  
      return NextResponse.json(deletedConversation)
    } catch (error) {
      return NextResponse.json(null);
    }
  }