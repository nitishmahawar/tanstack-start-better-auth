import { prisma } from "@/lib/prisma";
import { os } from "@orpc/server";
import * as z from "zod";

export const todosRouter = {
  // Create a new todo
  create: os
    .input(z.object({ text: z.string() }))
    .handler(async ({ input }) => {
      const todo = await prisma.todo.create({
        data: {
          text: input.text,
        },
      });
      return todo;
    }),

  // Get all todos
  getAll: os
    .input(z.object({}).optional())
    .handler(async () => {
      const todos = await prisma.todo.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return todos;
    }),

  // Get a single todo by ID
  getById: os
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
      const todo = await prisma.todo.findUnique({
        where: {
          id: input.id,
        },
      });
      return todo;
    }),

  // Update a todo
  update: os
    .input(z.object({
      id: z.string(),
      text: z.string().optional(),
      completed: z.boolean().optional()
    }))
    .handler(async ({ input }) => {
      const { id, ...updateData } = input;
      const todo = await prisma.todo.update({
        where: {
          id,
        },
        data: updateData,
      });
      return todo;
    }),

  // Delete a todo
  delete: os
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
      const todo = await prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
      return todo;
    }),
};
