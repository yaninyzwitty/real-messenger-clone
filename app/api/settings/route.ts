import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const { name, image } = body;
        
        if(!currentUser?.id) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                image,
                name,
            }
        })

        return NextResponse.json(updatedUser)
        
        
    } catch (error: any) {
        console.log(`error: ${error}`);
        return new NextResponse("Internal Server Error", {status: 500});
        
    }
    
}