import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json("Portfolio server re-activatied...", { status: 200 });
}