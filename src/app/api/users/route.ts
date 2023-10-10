import { NextRequest, NextResponse } from "next/server";

import prisma from "@/db/prisma";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}
