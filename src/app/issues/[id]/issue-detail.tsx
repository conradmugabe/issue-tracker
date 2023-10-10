import Markdown from "react-markdown";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";

import { IssueStatusBadge } from "@/components";

export function IssueDetail({ issue }: { issue: Issue }) {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" className="my-5">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
}
