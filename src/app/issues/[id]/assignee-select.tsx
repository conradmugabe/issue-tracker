"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Select, Text } from "@radix-ui/themes";
import { User } from "@prisma/client";

import { Skeleton } from "@/components";

export function AssigneeSelect() {
  const { data: users, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
  });

  if (users !== undefined) {
    return (
      <Select.Root>
        <Select.Trigger placeholder="Assign to..." className="w-full" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users.map((user) => (
              <Select.Item value={user.id} className="flex items-center">
                <Avatar
                  radius="full"
                  size="1"
                  src={user?.image!}
                  fallback={<Skeleton width="1rem" className="rounded-full" />}
                  className="mr-2"
                />
                <Text>{user.name}</Text>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    );
  }

  if (error) return null;

  return <Skeleton />;
}
