import { notFound } from "next/navigation";

import prisma from "@/db/prisma";
import { IssueForm } from "@/app/issues/_components/issue-form";

type Props = {
  params: { id: string };
};

export default async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
