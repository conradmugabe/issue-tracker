"use client";

import { Select } from "@radix-ui/themes";

export function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign to..." className="w-full" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="apple">Apple</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
