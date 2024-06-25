import Board from "@/components/Board";
import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";

const page = async () => {

  const { userId }: { userId: string | null } = auth();

  const board = await prisma.kanbbanBoard.findFirst({
    where: {
      userId: userId!,
    },
    include: {
      tasks: true,
    }
  });

  return (
    <div className="h-screen">
      <Board board={board} />
    </div>
  )
}

export default page