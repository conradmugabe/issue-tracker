import { notFound } from "next/navigation";

import Markdown from "react-markdown";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";

import prisma from "@/db/prisma";
import { IssueStatusBadge } from "@/components/issue-status-badge";

type Props = {
  params: { id: string };
};

export default async function IssueDetailPage({ params }: Props) {
  //   if (typeof params.id !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" className="my-5">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
}
