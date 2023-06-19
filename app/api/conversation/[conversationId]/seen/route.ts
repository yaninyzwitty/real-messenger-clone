import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/prismadb";
import { NextResponse } from "next/server";

type Props = {
    conversationId: string;

}

export async function POST(req: Request, { params }: { params: Props}) {
    try {
        const currentUser = await getCurrentUser();

        const { conversationId } = params;
        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse(`Unauthorized`, { status: 401 })
        
        }

        // find existing conversation
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        });

        if(!conversation) {
            return new NextResponse(`ID not found`, { status: 400 })  
        }


        // find ;ast messahe
        const lastMessage = conversation.messages[conversation.messages.length -1];

        if(!lastMessage) {
            return NextResponse.json(conversation)
        }
        // update seen of last message
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });
        return NextResponse.json(updatedMessage);



        
    } catch (error: any)
     {
        console.log("Error message", error);

        return new NextResponse(`Internal Error`, { status: 500 })
        
    }

}
