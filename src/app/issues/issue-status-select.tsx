"use client";

import { IssueStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  function filterBy(status: string) {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    const query = params.size ? "?" + params.toString() : "";
    router.push(`/issues${query}`);
  }

  return (
    <Select.Root defaultValue={currentStatus || ""} onValueChange={filterBy}>
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
