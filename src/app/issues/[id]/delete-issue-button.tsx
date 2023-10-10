"use client";

import { useState } from "react";

import axios from "axios";
import { AlertDialog, Button, Callout, Flex } from "@radix-ui/themes";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components";

export function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function deleteIssue() {
    try {
      setError(false);
      setIsSubmitting(true);
      await axios.delete("/api/issues/" + issueId);

      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError(true);
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            color="red"
            className="whitespace-nowrap"
            disabled={isSubmitting}
          >
            <AiOutlineDelete />
            Delete Issue {isSubmitting ? <Spinner /> : null}
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

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Failed to delete issue</AlertDialog.Title>
          <Callout.Root color="red">
            <Callout.Text>
              Something went wrong while deleting issue. Try again later
            </Callout.Text>
          </Callout.Root>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setError(false)}
              >
                Okay
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
