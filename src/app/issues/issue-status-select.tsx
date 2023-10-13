"use client";

import { IssueStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statusOptions: { label: string; value?: IssueStatus }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

export function IssueStatusSelect({
  currentStatus,
}: {
  currentStatus?: IssueStatus;
}) {
  const router = useRouter();

  return (
    <Select.Root
      defaultValue={currentStatus || ""}
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : "";
        router.push(`/issues${query}`);
      }}
    >
      <Select.Trigger />
      <Select.Content>
        {statusOptions.map((option) => (
          <Select.Item key={option.value || ""} value={option.value || ""}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
