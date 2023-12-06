import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import Filter from "@/components/shared/Filter";
import { getAllUsers } from "@/lib/actions/user.actions";
import Link from "next/link";
import UserCard from "@/components/cards/UserCard";
import { SearchParamsProps } from "@/types";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const results = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds..."
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {results.users.length > 0 ? (
          results.users.map((user) => <UserCard key={user.name} user={user} />)
        ) : (
          <div className="paragraph-regular first-letter:text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No Users yet</p>
            <Link href="/sign-up" className="mt-1 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Page;
