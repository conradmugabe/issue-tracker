import { Flex, Grid } from "@radix-ui/themes";
import { LatestIssues } from "./latest-issues";
import { IssuesSummary } from "./issues-summary";
import { IssuesBarChart } from "./issues-bar-chart";

export default function Home() {
  const open = 100;
  const closed = 200;
  const inProgress = 300;

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
