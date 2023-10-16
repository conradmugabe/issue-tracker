import { cache } from "react";
import { notFound } from "next/navigation";

import delay from "delay";
import { Box, Flex, Grid } from "@radix-ui/themes";

import prisma from "@/db/prisma";
import { nextAuthOptions } from "@/auth/next-auth-options";
import { EditIssueButton } from "./edit-issue-button";
import { IssueDetail } from "./issue-detail";
import { DeleteIssueButton } from "./delete-issue-button";
import { getServerSession } from "next-auth";
import { AssigneeSelect } from "./assignee-select";

type Props = {
  params: { id: string };
};

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

export default async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(nextAuthOptions);
  // if (typeof params.id !== "number") notFound();

  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) notFound();

  await delay(2000);

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      <Box className="space-y-4">
        <AssigneeSelect issue={issue} session={session} />
        {session ? (
          <Flex gap="4" className="items-start">
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        ) : null}
      </Box>
    </Grid>
  );
}

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  return { title: issue?.title, description: "Details of issue " + issue?.id };
}
