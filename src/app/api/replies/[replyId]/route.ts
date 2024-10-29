import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { replyId: string } },
) {
  const { replyId } = params;

  try {
    const reply = await prisma.reply.findUnique({
      where: { id: replyId },
    });

    if (!reply) {
      return NextResponse.json({ error: "Reply not found" }, { status: 404 });
    }

    const deletedReply = await prisma.reply.delete({
      where: { id: replyId },
    });

    return NextResponse.json(deletedReply, { status: 200 });
  } catch (error) {
    console.error("Error deleting reply:", error);
    return NextResponse.json(
      { error: "Failed to delete reply" },
      { status: 500 },
    );
  }
}
