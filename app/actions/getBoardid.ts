import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";

export const getBoardIdForUser = async () => {
  const { userId }: { userId: string | null } = auth();

  const board = await prisma.kanbbanBoard.findFirst({
    where: {
      userId: userId!,
    },
  });

  return board ? board.id : null;
};
