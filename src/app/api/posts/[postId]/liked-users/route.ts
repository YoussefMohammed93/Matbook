import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;

  try {
    const likes = await prisma.like.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });

    return NextResponse.json(likes.map((like) => like.user));
  } catch (error) {
    console.error("Error fetching liked users:", error);
    return NextResponse.error();
  }
}
