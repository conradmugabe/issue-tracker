import { NextRequest, NextResponse } from "next/server";

import prisma from "@/db/prisma";
import { createIssueSchema } from "@/issues/entities/dto";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validatedBody = createIssueSchema.safeParse(body);
  if (!validatedBody.success)
    return NextResponse.json(validatedBody.error.errors, { status: 400 });

  const { title, description } = validatedBody.data;
  const newIssue = await prisma.issue.create({ data: { title, description } });

  return NextResponse.json(newIssue, { status: 201 });
}
