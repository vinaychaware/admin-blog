import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: { posts: true },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
};
