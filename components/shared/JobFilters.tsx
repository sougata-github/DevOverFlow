"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";

import { Country } from "@/types";

import { formUrlQuery } from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface JobsFilterProps {
  countriesList: Country[];
}

const JobFilters = ({ countriesList }: JobsFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [paramFilter, setParamFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    const param = searchParams.get("location");
    setParamFilter(param || undefined);
  }, [searchParams]);

  function handleUpdateParams(value: any) {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "location",
      value,
    });

    router.push(newUrl, { scroll: false });
  }
  return (
    <div className="relative">
      <Select onValueChange={handleUpdateParams} value={paramFilter}>
        <SelectTrigger className="body-regular light-border background-light800_dark300 text-dark500_light700 min-h-[56px] border px-5 py-2.5 sm:max-w-[210px]">
          <div className="line-clamp-1 flex flex-1 gap-2 pr-2 text-left">
            <Image
              src="/assets/icons/location.svg"
              height={20}
              width={20}
              alt="location"
            />
            <SelectValue placeholder="Select Location" />
          </div>
        </SelectTrigger>
        <SelectContent className="body-semibold text-dark500_light700 small-regular max-h-[350px] max-w-[250px] cursor-pointer bg-white dark:border-none dark:bg-dark-300 ">
          <SelectGroup>
            {Array.isArray(countriesList) ? (
              countriesList.map((country: Country) => (
                <SelectItem
                  key={country.name.common}
                  value={country.name.common}
                  className="cursor-pointer px-8 py-3 focus:bg-gray-100 dark:focus:bg-dark-400"
                >
                  {country.name.common}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="No results found">No results found</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobFilters;
