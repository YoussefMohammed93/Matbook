import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    commentId: string;
  };
}

export async function POST(req: NextRequest, { params }: Params) {
  const { commentId } = params;

  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const reply = await prisma.reply.create({
      data: {
        content,
        userId: user.id,
        commentId,
      },
      include: {
        user: {
          select: { displayName: true, avatarUrl: true, username: true },
        },
      },
    });

    return NextResponse.json(reply, { status: 201 });
  } catch (error) {
    console.error("Error creating reply:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  const { commentId } = params;

  try {
    const replies = await prisma.reply.findMany({
      where: { commentId },
      include: {
        user: {
          select: { displayName: true, avatarUrl: true, username: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(replies, { status: 200 });
  } catch (error) {
    console.error("Error fetching replies:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
