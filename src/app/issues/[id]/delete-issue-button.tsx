import { Issue } from "@prisma/client";
import { Button } from "@radix-ui/themes";

export function DeleteIssueButton({ issueId }: { issueId: number }) {
  return <Button color="red" className="whitespace-nowrap">Delete Issue</Button>;
}
