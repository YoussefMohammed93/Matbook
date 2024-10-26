import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { FollowerInfo } from "@/lib/types";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { userId } = req.query;

    const user = await prisma.user.findUnique({
      where: { id: userId as string },
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
      return res.status(404).json({ error: "User not found" });
    }

    const data: FollowerInfo = {
      followers: user._count.followers,
      isFollowedByUser: !!user.followers.length,
    };

    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { userId } = req.query;

    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: loggedInUser.id,
          followingId: userId as string,
        },
      },
      create: {
        followerId: loggedInUser.id,
        followingId: userId as string,
      },
      update: {},
    });

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { userId } = req.query;

    await prisma.follow.deleteMany({
      where: {
        followerId: loggedInUser.id,
        followingId: userId as string,
      },
    });

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
