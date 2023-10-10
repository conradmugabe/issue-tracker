import { Button } from "@radix-ui/themes";
import { AiOutlineDelete } from "react-icons/ai";

export function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button color="red" className="whitespace-nowrap">
      <AiOutlineDelete />
      Delete Issue
    </Button>
  );
}
