import { Pagination } from "@/components/pagination";

export default function Home() {
  return (
    <div>
      <Pagination itemCount={100} pageSize={10} currentPage={1} />
    </div>
  );
}
