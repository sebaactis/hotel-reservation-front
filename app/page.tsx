import Categories from "@/components/Categories/Categories";
import Recommendations from "@/components/Recommendations/Recommendations";
import Search from "@/components/Search/Search";


export default function Home() {
  return (
    <section className="flex flex-col gap-4">
      <Search />
      <Categories />
      <Recommendations />
    </section>
  );
}
