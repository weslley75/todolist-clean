import { TodoItem } from "@prisma/client";
import prisma from "../../../service/prisma";

export async function GET(): Promise<Response> {
  const todos = await prisma.todoItem.findMany();
  return new Response(JSON.stringify(todos), {
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request): Promise<Response> {
  const todoItem = (await request.json()) as Omit<
    TodoItem,
    "isCompleted" | "createdAt" | "updatedAt"
  >;
  await prisma.todoItem.create({ data: { ...todoItem } });

  return new Response(null, { status: 201 });
}

export async function PUT(request: Request): Promise<Response> {
  const { id, ...rest } = (await request.json()) as Omit<
    TodoItem,
    "createdAt" | "updatedAt"
  >;
  await prisma.todoItem.update({ where: { id }, data: { ...rest } });

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

  await prisma.todoItem.delete({ where: { id } });

  return new Response(null, { status: 204 });
}
