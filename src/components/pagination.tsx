import classnames from "classnames";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
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
  searchParams: Record<string, string>;
};

export function Pagination({
  currentPage,
  itemCount,
  pageSize,
  searchParams,
}: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  const disabledNextPage = currentPage === pageCount;
  const disabledPreviousPage = currentPage === 1;

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Link
        href={{ query: { ...searchParams, page: 1 } }}
        className={classnames("h-8 px-2 grid place-items-center rounded-sm", {
          "bg-gray-100 cursor-not-allowed": disabledPreviousPage,
          "bg-gray-300": !disabledPreviousPage,
        })}
      >
        <FiChevronsLeft />
      </Link>
      <Link
        href={{
          query: {
            ...searchParams,
            page: currentPage > 1 ? currentPage - 1 : 1,
          },
        }}
        className={classnames("h-8 px-2 grid place-items-center rounded-sm", {
          "bg-gray-100 cursor-not-allowed": disabledPreviousPage,
          "bg-gray-300": !disabledPreviousPage,
        })}
      >
        <FiChevronLeft />
      </Link>
      <Link
        href={{
          query: {
            ...searchParams,
            page: currentPage < pageCount ? currentPage + 1 : pageCount,
          },
        }}
        className={classnames("h-8 px-2 grid place-items-center rounded-sm", {
          "bg-gray-100 cursor-not-allowed": disabledNextPage,
          "bg-gray-300": !disabledNextPage,
        })}
      >
        <FiChevronRight />
      </Link>
      <Link
        href={{ query: { ...searchParams, page: pageCount } }}
        className={classnames("h-8 px-2 grid place-items-center rounded-sm", {
          "bg-gray-100 cursor-not-allowed": disabledNextPage,
          "bg-gray-300": !disabledNextPage,
        })}
      >
        <FiChevronsRight />
      </Link>
    </Flex>
  );
}
