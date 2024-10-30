import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  postId: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { postId } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
