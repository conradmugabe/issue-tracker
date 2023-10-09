import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must not exceed 255 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" }),
});
