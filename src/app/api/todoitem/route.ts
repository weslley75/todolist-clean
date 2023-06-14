import { TaskItem } from "@prisma/client";
import prisma from "../../../service/prisma";

const taskItemRepo = prisma.taskItem;

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (id) {
    const task = await taskItemRepo.findUnique({ where: { id } });
    return new Response(JSON.stringify(task), {
      headers: { "content-type": "application/json" },
    });
  }

  const tasks = await taskItemRepo.findMany();
  return new Response(JSON.stringify(tasks), {
    headers: { "content-type": "application/json" },
  });
}

type PostBody = Omit<TaskItem, "isCompleted" | "createdAt" | "updatedAt">;

export async function POST(request: Request): Promise<Response> {
  const taskPayload = (await request.json()) as PostBody;
  await taskItemRepo.create({ data: { ...taskPayload } });

  return new Response(null, { status: 201 });
}

type PutBody = Omit<TaskItem, "createdAt" | "updatedAt">;

export async function PUT(request: Request): Promise<Response> {
  const { id, ...rest } = (await request.json()) as PutBody;
  await taskItemRepo.update({ where: { id }, data: { ...rest } });

  return new Response(null, { status: 204 });
}

export async function DELETE(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ message: "id is required" }), {
      status: 400,
    });
  }

  await taskItemRepo.delete({ where: { id } });

  return new Response(null, { status: 204 });
}
