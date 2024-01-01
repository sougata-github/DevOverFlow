import LocalSearch from "@/components/shared/search/LocalSearch";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs | DevOverFlow",
};

const Page = () => {
  return (
    <>
      <div>
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearch
            route="/collection"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Job title, Company, or Keywords"
            otherClasses="flex-1"
          />
          <div className="relative">
            <Select>
              <SelectTrigger className="body-regular light-border background-light800_dark300 text-dark500_light700 min-h-[56px] border px-5 py-2.5 sm:min-w-[170px]">
                <div className="line-clamp-1 flex-1 text-left">
                  <SelectValue placeholder="Select Location" />
                </div>
              </SelectTrigger>
              <SelectContent className="text-dark500_light700 small-regular bg-white dark:border-none dark:bg-dark-300">
                <SelectGroup>
                  {filters.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      className="focus:bg-gray-100 dark:focus:bg-dark-400"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

const filters = ["India", "China", "USA", "Japan"];
