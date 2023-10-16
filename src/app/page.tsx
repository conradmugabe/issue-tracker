import { Metadata } from "next";

import { Flex, Grid } from "@radix-ui/themes";

import prisma from "@/db/prisma";
import { LatestIssues } from "./latest-issues";
import { IssuesSummary } from "./issues-summary";
import { IssuesBarChart } from "./issues-bar-chart";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
  const inProgress = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid gap="4" columns={{ initial: "1", md: "2" }}>
      <Flex direction="column" gap="4">
        <IssuesSummary open={open} closed={closed} inProgress={inProgress} />
        <IssuesBarChart open={open} closed={closed} inProgress={inProgress} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View issue summary",
};
