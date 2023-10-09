import { IssueStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const issueStatusMap: Record<
  IssueStatus,
  { label: string; color: "red" | "green" | "yellow" }
> = {
  CLOSED: { color: "green", label: "Complete" },
  OPEN: { color: "red", label: "Open" },
  IN_PROGRESS: { color: "yellow", label: "In Progress" },
};

export function IssueStatusBadge({ status }: { status: IssueStatus }) {
  const { color, label } = issueStatusMap[status];
  return <Badge color={color}>{label}</Badge>;
}
