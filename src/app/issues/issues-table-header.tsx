import Link from "next/link";

import { FiArrowUp } from "react-icons/fi";
import { Issue } from "@prisma/client";
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

export function IssuesTableHeader({
  currentOrderBy,
}: {
  currentOrderBy?: OrderBy;
}) {
  return (
    <Table.Header>
      <Table.Row>
        {headings.map((heading) => (
          <Table.ColumnHeaderCell
            key={heading.orderBy}
            className={heading.className}
          >
            <Link href="">
              {heading.label}{" "}
              {currentOrderBy ? <FiArrowUp className="inline" /> : null}
            </Link>
          </Table.ColumnHeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}
