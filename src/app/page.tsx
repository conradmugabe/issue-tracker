import { Grid } from "@radix-ui/themes";
import { LatestIssues } from "./latest-issues";
import { IssuesSummary } from "./issues-summary";

export default function Home() {
  const open = 1;
  const closed = 2;
  const inProgress = 3;

  return (
    <Grid>
      <IssuesSummary open={open} closed={closed} inProgress={inProgress} />
    </Grid>
  );
}
