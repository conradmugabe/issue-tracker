"use client";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Select, Text } from "@radix-ui/themes";
import { Session } from "next-auth";

import { Issue, User } from "@prisma/client";
import { Skeleton } from "@/components";

type Props = {
  issue: Issue;
  session: Session | null;
};

export function AssigneeSelect({ issue, session }: Props) {
  const { data: users, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
  });

  function assignUser(userId: string) {
    axios
      .patch("/api/issues/" + issue.id, {
        assigneeUserId: userId,
      })
      .catch(() => toast.error("Failed to assign user. Try again later."));
  }

  if (users !== undefined) {
    return (
      <>
        <Select.Root
          defaultValue={issue.assigneeUserId || ""}
          disabled={!session}
          onValueChange={assignUser}
        >
          <Select.Trigger placeholder="Assign to..." className="w-full" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              <Select.Item value="">No one</Select.Item>
              {users.map((user) => (
                <Select.Item
                  key={user.id}
                  value={user.id}
                  className="flex items-center"
                >
                  <Avatar
                    radius="full"
                    size="1"
                    src={user?.image!}
                    fallback={
                      <Skeleton width="1rem" className="rounded-full" />
                    }
                    className="mr-2"
                  />
                  <Text>{user.name}</Text>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Toaster />
      </>
    );
  }

  if (error) return null;

  return <Skeleton />;
}
