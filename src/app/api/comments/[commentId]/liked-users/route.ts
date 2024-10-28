import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { commentId: string } },
) {
  const { commentId } = params;

  try {
    const likes = await prisma.commentLike.findMany({
      where: { commentId },
      include: {
        user: {
          select: {
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });

    const likedUsers = likes.map((like) => like.user);
    return NextResponse.json(likedUsers);
  } catch (error) {
    console.error("Error fetching liked users:", error);
    return NextResponse.json(
      { error: "Failed to fetch liked users" },
      { status: 500 },
    );
  }
}
