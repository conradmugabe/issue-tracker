import { IssueStatus } from "@prisma/client";
import { Card, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  open: number;
  closed: number;
  inProgress: number;
};

type Summary = { label: string; total: number; value: IssueStatus };

export function IssuesSummary({ closed, inProgress, open }: Props) {
  const summaries: Summary[] = [
    { label: "Open Issues", total: open, value: "OPEN" },
    { label: "In Progress Issues", total: inProgress, value: "IN_PROGRESS" },
    { label: "Closed Issues", total: closed, value: "CLOSED" },
  ];

  return (
    <Grid columns="3" gap="2">
      {summaries.map((summary) => (
        <Card key={summary.label} asChild>
          <Link key={summary.value} href={`/issues?status=${summary.value}`}>
            <Flex direction="column" gap="2">
              <Text size="2" className="font-medium">
                {summary.label}
              </Text>
              <Text size="8" className="font-semibold">
                {summary.total}
              </Text>
            </Flex>
          </Link>
        </Card>
      ))}
    </Grid>
  );
}
