"use client";

import Link from "next/link";
import { Badge } from "../ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
  isTruncated?: boolean;
}

const RenderTags = ({
  _id,
  name,
  totalQuestions,
  showCount,
  isTruncated,
}: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge
        className="subtle-medium background-light800_dark300 text-light400_light500
      rounded-md border-none px-4 py-2 uppercase"
      >
        {isTruncated
          ? name.length > 4
            ? name.slice(0, 4).concat("...")
            : name
          : name}
      </Badge>
      {showCount && (
        <div>
          <p className="small-medium text-dark500_light700">{totalQuestions}</p>
        </div>
      )}
    </Link>
  );
};

export default RenderTags;
