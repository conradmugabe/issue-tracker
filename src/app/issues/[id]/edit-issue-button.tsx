import Link from "next/link";

import { Button } from "@radix-ui/themes";

export function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Link href={`/issues/${issueId}/edit`} className="cursor-pointer">
      <Button className="cursor-pointer">Edit Issue</Button>
    </Link>
  );
}
