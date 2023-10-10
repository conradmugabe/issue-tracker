import { notFound } from "next/navigation";

import delay from "delay";
import { Box, Flex, Grid } from "@radix-ui/themes";

import prisma from "@/db/prisma";
import { EditIssueButton } from "./edit-issue-button";
import { IssueDetail } from "./issue-detail";
import { DeleteIssueButton } from "./delete-issue-button";
import { getServerSession } from "next-auth";

type Props = {
  params: { id: string };
};

export default async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession();
  // if (typeof params.id !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  await delay(2000);

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      <Box>
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
