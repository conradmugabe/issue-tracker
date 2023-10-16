import NextLink from "next/link";

import delay from "delay";
import { Button, Flex } from "@radix-ui/themes";

import prisma from "@/db/prisma";
import { Pagination } from "@/components/pagination";
import { IssueStatusSelect } from "./issue-status-select";
import { getSearchParams } from "./_utils";
import { IssueQuery, IssuesTable } from "./issues-table";
import { Metadata } from "next";

type Props = {
  searchParams: IssueQuery;
};

export default async function IssuesPage({ searchParams }: Props) {
  const { orderBy, status } = getSearchParams(searchParams);
  const pageSize = 10;
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
      <IssuesTable issues={issues} searchParams={searchParams} />
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

export const metadata: Metadata = {
  title: "Issue Tracker - Issues",
  description: "View issue summary",
};