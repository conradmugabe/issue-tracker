import { Button } from "@radix-ui/themes";
import Link from "next/link";

export function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button className="cursor-pointer">Edit Issue</Button>
    </Link>
  );
}
