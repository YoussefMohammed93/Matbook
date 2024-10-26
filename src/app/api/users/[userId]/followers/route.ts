import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { FollowerInfo } from "@/lib/types";
import { NextApiRequest, NextApiResponse } from "next";

// Handles GET requests
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.query.userId as string;

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
      isFollowedByUser: user.followers.length > 0,
    };

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Handles POST requests
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.query.userId as string;

    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: loggedInUser.id,
          followingId: userId,
        },
      },
      create: {
        followerId: loggedInUser.id,
        followingId: userId,
      },
      update: {},
    });

    return res.status(200).send("Follow successful");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Handles DELETE requests
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.query.userId as string;

    await prisma.follow.deleteMany({
      where: {
        followerId: loggedInUser.id,
        followingId: userId,
      },
    });

    return res.status(200).send("Unfollow successful");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
