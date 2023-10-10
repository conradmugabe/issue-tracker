import { notFound } from "next/navigation";

import { Box, Grid } from "@radix-ui/themes";

import prisma from "@/db/prisma";
import { EditIssueButton } from "./edit-issue-button";
import { IssueDetail } from "./issue-detail";

type Props = {
  params: { id: string };
};

export default async function IssueDetailPage({ params }: Props) {
  // if (typeof params.id !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  // await delay(2000);

  return (
    <Grid columns={{ initial: "1" }} gap="5">
      <Box>
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
}
