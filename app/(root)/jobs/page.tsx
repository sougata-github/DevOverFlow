import {
  fetchCountries,
  fetchJobs,
  fetchLocation,
} from "@/lib/actions/job.action";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Pagination from "@/components/shared/Pagination";
import JobFilters from "@/components/shared/JobFilters";
import JobCard from "@/components/cards/JobCard";
import type { Metadata } from "next";
import { Job } from "@/types";

export const metadata: Metadata = {
  title: "Jobs | DevOverFlow",
};

interface Props {
  searchParams: {
    q: string;
    location: string;
    page: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const userLocation = await fetchLocation();

  const query =
    searchParams.q || searchParams.location
      ? `${searchParams.q || ""}, ${searchParams.location || ""}`
          .trim()
          .replace(/^,|,$/g, "")
      : `Software Engineer in ${userLocation}`;

  const jobs = await fetchJobs({
    query,
    page: searchParams.page ?? 1,
  });

  const countries = await fetchCountries();

  console.log(countries);

  const page = parseInt(searchParams.page ?? 1);

  return (
    <>
      <div>
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearch
            route="/jobs"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Job title, Company, or Keywords"
            otherClasses="flex-1"
          />
          <JobFilters countriesList={countries} />
        </div>
      </div>

      <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {jobs.length > 0 ? (
          jobs.map((job: Job) => {
            if (job.job_title && job.job_title.toLowerCase() !== "undefined")
              return <JobCard key={job.id || job.job_title} job={job} />;

            return null;
          })
        ) : (
          <p className="paragraph-regular text-dark200_light800 w-full text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </p>
        )}
      </section>

      {jobs.length > 0 && (
        <Pagination pageNumber={page} isNext={jobs.length === 10} />
      )}
    </>
  );
};

export default Page;
