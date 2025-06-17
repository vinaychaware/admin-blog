import { prisma } from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            views: true,
            createdAt: true,
          }
        },
        comments: {
          select: {
            id: true,
            desc: true,
            createdAt: true,
          }
        },
        _count: {
          select: {
            posts: true,
            comments: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(users);
  } catch (error: any) {
    console.error('❌ Failed to fetch users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error.message },
      { status: 500 }
    );
  }
}
