"use server";

import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { getUserDataSelect } from "@/lib/types";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: validatedValues,
    select: getUserDataSelect(user.id),
  });

  return updatedUser;
}
