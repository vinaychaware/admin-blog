import { prisma } from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        Post: true, // ✅ Use the correct relation name as defined in your Prisma schema
      },
    });

    return NextResponse.json(users);
  } catch (error: any) {
    console.error("❌ Failed to fetch users:", error); // Log full error
    return NextResponse.json(
      { error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}
