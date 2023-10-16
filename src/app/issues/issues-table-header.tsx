import Link from "next/link";

import { FiArrowUp } from "react-icons/fi";
import { Issue, IssueStatus } from "@prisma/client";
import { Table } from "@radix-ui/themes";

export type OrderBy = keyof Pick<Issue, "title" | "status" | "createdAt">;

const headings: { label: string; orderBy: OrderBy; className?: string }[] = [
  { label: "Title", orderBy: "title" },
  { label: "Status", orderBy: "status", className: "hidden md:table-cell" },
  {
    label: "Created",
    orderBy: "createdAt",
    className: "hidden md:table-cell",
  },
];

type Props = { status?: IssueStatus; orderBy?: OrderBy };

export function IssuesTableHeader(props: Props) {
  return (
    <Table.Header>
      <Table.Row>
        {headings.map((heading) => (
          <Table.ColumnHeaderCell
            key={heading.orderBy}
            className={heading.className}
          >
            <Link href={{ query: { ...props, orderBy: heading.orderBy } }}>
              {heading.label}{" "}
              {props.orderBy === heading.orderBy ? (
                <FiArrowUp className="inline" />
              ) : null}
            </Link>
          </Table.ColumnHeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}
