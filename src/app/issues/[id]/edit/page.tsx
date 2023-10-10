import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import prisma from "@/db/prisma";
import { IssueFormSkeleton } from "@/app/issues/_components/issue-form-skeleton";

type Props = {
  params: { id: string };
};

const IssueForm = dynamic(() => import("@/app/issues/_components/issue-form"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
