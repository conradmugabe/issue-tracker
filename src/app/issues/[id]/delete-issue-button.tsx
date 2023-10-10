"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { AiOutlineDelete } from "react-icons/ai";

export function DeleteIssueButton({ issueId }: { issueId: number }) {
  function deleteIssue() {}

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" className="whitespace-nowrap">
          <AiOutlineDelete />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={deleteIssue}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
