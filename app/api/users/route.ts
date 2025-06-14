// app/api/users/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
   const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });

    return NextResponse.json(users);
  } catch (error: any) {
    console.error('❌ Failed to fetch users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}