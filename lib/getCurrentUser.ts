import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export const getCurrentUser = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      userId,
    },
  });

  return user;
};