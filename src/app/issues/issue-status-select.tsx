"use client";

import { IssueStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const statusOptions: { label: string; value?: IssueStatus }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

export function IssueStatusSelect() {
  return (
    <Select.Root defaultValue="">
      <Select.Trigger />
      <Select.Content>
        {statusOptions.map((option) => (
          <Select.Item value={option.value || ""}>{option.label}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
