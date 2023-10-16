import NextLink from "next/link";

import delay from "delay";
import { Button, Flex, Table } from "@radix-ui/themes";
import { IssueStatus } from "@prisma/client";

import prisma from "@/db/prisma";
import { IssueStatusBadge, Link } from "@/components";
import { IssueStatusSelect } from "./issue-status-select";
import { IssuesTableHeader, OrderBy } from "./issues-table-header";
import { getSearchParams } from "./_utils";

type Props = {
  searchParams: { status?: IssueStatus; orderBy?: OrderBy };
};

export default async function IssuesPage({ searchParams }: Props) {
  const { orderBy, status } = getSearchParams(searchParams);

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  await delay(2000);

  return (
    <div>
      <Flex className="mb-5 justify-between">
        <IssueStatusSelect currentStatus={searchParams.status} />
        <Button>
          <NextLink href="/issues/new">New Issue</NextLink>
        </Button>
      </Flex>
      <Table.Root variant="surface">
        <IssuesTableHeader {...searchParams} />
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="mt-2 md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export const dynamic = "force-dynamic";
