import { IssueStatusBadge } from "@/components/issue-status-badge";
import prisma from "@/db/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

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
      <Card>
        <Text>{issue.description}</Text>
      </Card>
    </div>
  );
}
