import { NextRequest, NextResponse } from "next/server";

import prisma from "@/db/prisma";
import { issueSchema } from "@/issues/entities/dto";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth/next-auth-options";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validatedBody = issueSchema.safeParse(body);
  if (!validatedBody.success)
    return NextResponse.json(validatedBody.error.errors, { status: 400 });

  const { title, description } = validatedBody.data;
  const newIssue = await prisma.issue.create({ data: { title, description } });

  return NextResponse.json(newIssue, { status: 201 });
}
