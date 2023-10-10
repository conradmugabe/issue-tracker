import Link from "next/link";

import { Button } from "@radix-ui/themes";
import { BsPencilSquare } from "react-icons/bs";

export function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Link href={`/issues/${issueId}/edit`} className="cursor-pointer">
      <Button className="cursor-pointer whitespace-nowrap">
        <BsPencilSquare />
        Edit Issue
      </Button>
    </Link>
  );
}
