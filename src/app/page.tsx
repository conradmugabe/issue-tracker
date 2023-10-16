import { Pagination } from "@/components/pagination";

type Props = {
  searchParams: { page: string };
};

export default function Home({ searchParams }: Props) {
  return (
    <div>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
        searchParams={searchParams}
      />
    </div>
  );
}
