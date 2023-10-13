import NextLink from "next/link";

import delay from "delay";
import { Button, Flex, Table } from "@radix-ui/themes";
import { IssueStatus } from "@prisma/client";

import prisma from "@/db/prisma";
import { IssueStatusBadge, Link } from "@/components";
import { IssueStatusSelect, statusOptions } from "./issue-status-select";

type Props = {
  searchParams: { status?: IssueStatus };
};

const statuses: (IssueStatus | undefined)[] = ["OPEN", "IN_PROGRESS", "CLOSED"];

export default async function IssuesPage({ searchParams }: Props) {
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
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
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
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
