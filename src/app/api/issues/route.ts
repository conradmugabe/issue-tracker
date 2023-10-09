import { NextRequest, NextResponse } from "next/server";

import prisma from "@/db/prisma";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title must be at least 1 character" })
    .max(255, { message: "Title must not exceed 255 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description must be at least 1 character" }),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validatedBody = createIssueSchema.safeParse(body);
  if (!validatedBody.success)
    return NextResponse.json(validatedBody.error.errors, { status: 400 });

  const { title, description } = validatedBody.data;
  const newIssue = await prisma.issue.create({ data: { title, description } });

  return NextResponse.json(newIssue, { status: 201 });
}
