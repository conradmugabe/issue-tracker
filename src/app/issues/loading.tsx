import Skeleton from "react-loading-skeleton";
import { Table } from "@radix-ui/themes";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingIssuesPage() {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div>
      <div className="mb-5 flex">
        <Skeleton className="h-8 px-12" />
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <Skeleton />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Skeleton />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Skeleton />
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.RowHeaderCell>
                <Skeleton />
                <div className="md:hidden">
                  <Skeleton />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
