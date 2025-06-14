import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/users/[id] - Get single user with all related data
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        Post: {
          include: {
            _count: {
              select: {
                Comment: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        Comment: {
          include: {
            post: {
              select: {
                title: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            Post: true,
            Comment: true,
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/users/[id] - Update user
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Filter only allowed fields for update
    const allowedFields = ['name', 'bio', 'location', 'website', 'twitter', 'linkedin', 'image'];
    const updateData: any = {};

    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        Post: {
          include: {
            _count: {
              select: {
                Comment: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        Comment: {
          include: {
            post: {
              select: {
                title: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            Post: true,
            Comment: true,
          }
        }
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // First check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete user (this will cascade delete related posts and comments if configured)
    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}