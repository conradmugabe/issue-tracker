import { Button, Flex, Text } from "@radix-ui/themes";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

export function Pagination({ currentPage, itemCount, pageSize }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button variant="soft" color="gray">
        <FiChevronsLeft />
      </Button>
      <Button variant="soft" color="gray">
        <FiChevronLeft />
      </Button>
      <Button variant="soft" color="gray">
        <FiChevronRight />
      </Button>
      <Button variant="soft" color="gray">
        <FiChevronsRight />
      </Button>
    </Flex>
  );
}
