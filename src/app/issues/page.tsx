import NextLink from "next/link";

import delay from "delay";
import { Button, Flex, Table } from "@radix-ui/themes";
import { IssueStatus } from "@prisma/client";

import prisma from "@/db/prisma";
import { IssueStatusBadge, Link } from "@/components";
import { Pagination } from "@/components/pagination";
import { IssueStatusSelect } from "./issue-status-select";
import { IssuesTableHeader, OrderBy } from "./issues-table-header";
import { getSearchParams } from "./_utils";

type Props = {
  searchParams: { status?: IssueStatus; orderBy?: OrderBy; page: string };
};

export default async function IssuesPage({ searchParams }: Props) {
  const { orderBy, status } = getSearchParams(searchParams);
  const pageSize = 2;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
  });
  const issuesCount = await prisma.issue.count({ where: { status } });

  await delay(2000);

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between">
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
      <Pagination
        pageSize={pageSize}
        itemCount={issuesCount}
        currentPage={currentPage}
        searchParams={searchParams}
      />
    </Flex>
  );
}

export const dynamic = "force-dynamic";
