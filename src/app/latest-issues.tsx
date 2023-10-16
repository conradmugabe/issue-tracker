import { Avatar, Card, Flex, Grid, Text } from "@radix-ui/themes";

import { IssueStatusBadge } from "@/components";
import prisma from "@/db/prisma";
import Link from "next/link";

export async function LatestIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assigneeUser: true },
  });

  return (
    <Card>
      <Grid gap="4" className="divide-y">
        {issues.map((issue) => (
          <Flex key={issue.id} justify="between" align="center">
            <Flex direction="column" align="start" gap="2">
              <Text>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Text>
              <IssueStatusBadge status={issue.status} />
            </Flex>
            {issue.assigneeUserId ? (
              <Avatar
                fallback="?"
                alt={issue.assigneeUser?.name!}
                src={issue.assigneeUser?.image!}
                size="1"
                radius="full"
              />
            ) : null}
          </Flex>
        ))}
      </Grid>
    </Card>
  );
}
