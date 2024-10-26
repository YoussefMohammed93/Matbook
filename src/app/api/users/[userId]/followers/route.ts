import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { FollowerInfo } from "@/lib/types";
import { NextResponse } from "next/server";

// GET Request handler to fetch followers information
export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.userId },
      select: {
        followers: {
          where: {
            followerId: loggedInUser.id,
          },
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data: FollowerInfo = {
      followers: user._count.followers,
      isFollowedByUser: !!user.followers.length,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST Request handler to follow a user
export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: loggedInUser.id,
          followingId: params.userId,
        },
      },
      create: {
        followerId: loggedInUser.id,
        followingId: params.userId,
      },
      update: {},
    });

    return new NextResponse(null, { status: 204 }); // Return 204 No Content
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE Request handler to unfollow a user
export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.follow.deleteMany({
      where: {
        followerId: loggedInUser.id,
        followingId: params.userId,
      },
    });

    return new NextResponse(null, { status: 204 }); // Return 204 No Content
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
