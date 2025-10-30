import { prisma } from "@/lib/prisma";
import { authed } from "@/orpc/init";
import { CreateNoteSchema, UpdateNoteSchema, GetNoteSchema } from "./schema";
import { z } from "zod";
import { ORPCError } from "@orpc/server";

export const notesRouter = {
  // Create a new note
  create: authed.input(CreateNoteSchema).handler(async ({ input, context }) => {
    const note = await prisma.note.create({
      data: {
        title: input.title,
        content: input.content,
        userId: context.user.id,
      },
    });
    return note;
  }),

  // Get all notes for the authenticated user
  getAll: authed.input(z.object({}).optional()).handler(async ({ context }) => {
    const notes = await prisma.note.findMany({
      where: {
        userId: context.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return notes;
  }),

  // Get a single note by ID (only if owned by user)
  getById: authed.input(GetNoteSchema).handler(async ({ input, context }) => {
    const note = await prisma.note.findFirst({
      where: {
        id: input.id,
        userId: context.user.id,
      },
    });
    return note;
  }),

  // Update a note (only if owned by user)
  update: authed.input(UpdateNoteSchema).handler(async ({ input, context }) => {
    const { id, ...updateData } = input;

    const note = await prisma.note.updateMany({
      where: {
        id,
        userId: context.user.id,
      },
      data: updateData,
    });

    if (note.count === 0) {
      throw new ORPCError("NOT_FOUND", {
        message: "Note not found or you don't have permission to update it",
      });
    }

    // Return the updated note
    return prisma.note.findUnique({
      where: { id },
    });
  }),

  // Delete a note (only if owned by user)
  delete: authed.input(GetNoteSchema).handler(async ({ input, context }) => {
    const note = await prisma.note.deleteMany({
      where: {
        id: input.id,
        userId: context.user.id,
      },
    });

    if (note.count === 0) {
      throw new ORPCError("NOT_FOUND", {
        message: "Note not found or you don't have permission to delete it",
      });
    }

    return { success: true, id: input.id };
  }),
};
