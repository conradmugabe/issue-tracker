import { Box } from "@radix-ui/themes";

import { Skeleton } from "@/components";

export function IssueFormSkeleton() {
  return (
    <Box className="max-w-xl">
      <Box className="grid gap-4">
        <Skeleton height="2rem" />
        <Skeleton count={15} />
        <Skeleton height="2rem" width="7rem" className="mt-8" />
      </Box>
    </Box>
  );
}
