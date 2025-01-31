import { connectToDatabase } from "@/database/connection";
import MessageModel from "@/database/model/message.schema";
import { NextRequest, NextResponse } from "next/server";

type MessageType = {
    senderName: string,
    senderEmail: string,
    message: string
};

export async function POST(req: NextRequest) {
    const data: MessageType = await req.json();

    if (!data.senderEmail) return NextResponse.json({ error: "Email is required for sending the message!!" }, { status: 403 });
    if (!data.senderEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.senderEmail)) return NextResponse.json({ error: "Invalid email format!" }, { status: 403 });
    if (!data.message) return NextResponse.json({ error: "Message is required!!" }, { status: 403 });

    try {
        await connectToDatabase();
        await MessageModel.create({
            senderName: data.senderName,
            senderEmail: data.senderEmail,
            message: data.message
        })
        return new Response("Message sent successfully...", { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong, Please try later!!" }, { status: 500 });
    }
}