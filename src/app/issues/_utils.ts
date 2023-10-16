import { IssueStatus } from "@prisma/client";
import { OrderBy } from "./issues-table-header";

const statuses: (IssueStatus | undefined)[] = ["OPEN", "IN_PROGRESS", "CLOSED"];
const orders: OrderBy[] = ["title", "status", "createdAt"];

export function getSearchParams(searchParams: {
  status?: IssueStatus;
  orderBy?: OrderBy;
}) {
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = searchParams.orderBy
    ? orders.includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: "asc" }
      : undefined
    : undefined;

  return { status, orderBy };
}
