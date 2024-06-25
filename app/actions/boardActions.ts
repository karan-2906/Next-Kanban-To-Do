"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";

const { userId }: { userId: string | null } = auth();

export async function creareNewBoard(formdata: FormData) {
  const name = formdata.get("boardname") as string;

  const existingBoard = await prisma.kanbbanBoard.findFirst({
    where: {
      userId: userId!,
    },
  });

  if (existingBoard) {
    await prisma.kanbbanBoard.update({
      where: {
        id: existingBoard.id,
      },
      data: {
        name: name,
      },
    });
  } else {
    await prisma.kanbbanBoard.create({
      data: {
        name: name,
        userId: userId!,
      },
    });
  }

  revalidatePath("/");
}

export async function createTask(formData: FormData) {
  const name = formData.get("task") as string;
  const description = formData.get("description") as string;
  const boardId = formData.get("boardId") as string;

  if (!name.trim()) {
    return;
  }

  await prisma.task.create({
    data: {
      name: name,
      description: description,
      board: { connect: { id: boardId } },
      status: "TODO",
    },
  });

  revalidatePath("/");
}
export async function editTask(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  const newname = formData.get("newTask") as string;
  const newdescription = formData.get("newDescription") as string;

  if (!newname.trim() && !newdescription.trim()) {
    return;
  }

  const data: { name?: string; description?: string } = {};

  // Check if name is provided and not an empty string
  if (newname !== null && newname.trim()) {
    data.name = newname;
  }

  // Check if newDescription is provided and not null
  if (newdescription !== null && newdescription.trim()) {
    data.description = newdescription;
  }

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: data,
  });

  revalidatePath("/");
}

export async function deleteTask(formData: FormData) {
  const taskId = formData.get("taskId") as string;

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  revalidatePath("/");
}
