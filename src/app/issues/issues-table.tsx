import Link from "next/link";

import { Table } from "@radix-ui/themes";
import { Issue, IssueStatus } from "@prisma/client";

import { IssueStatusBadge } from "@/components";
import { OrderBy, IssuesTableHeader } from "./issues-table-header";

export type IssueQuery = {
  status?: IssueStatus;
  orderBy?: OrderBy;
  page: string;
};

type Props = { issues: Issue[]; searchParams: IssueQuery };

export function IssuesTable({ issues, searchParams }: Props) {
  return (
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
  );
}
