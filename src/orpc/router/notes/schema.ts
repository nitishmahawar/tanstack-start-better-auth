import { z } from "zod";

export const CreateNoteSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(1, "Content is required"),
});

export const UpdateNoteSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required").max(200, "Title too long").optional(),
  content: z.string().optional(),
});

export const GetNoteSchema = z.object({
  id: z.string(),
});

export type CreateNoteInput = z.infer<typeof CreateNoteSchema>;
export type UpdateNoteInput = z.infer<typeof UpdateNoteSchema>;
export type GetNoteInput = z.infer<typeof GetNoteSchema>;