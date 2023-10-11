import React from "react";
import Link from "next/link";
import RenderTags from "../shared/RenderTags";
import Metric from "../shared/Metric";

interface Props {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  views: number;
  upvotes: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  views,
  upvotes,
  createdAt,
  answers,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11 ">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row  ">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden ">
            {String(createdAt)}
          </span>
          <Link href={`question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1 ">
              {title}
            </h3>
          </Link>
        </div>
        {/* If signed in add edit delete actions. */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2 ">
        {tags.map((tag) => (
          <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full">
        <Metric />
      </div>
    </div>
  );
};

export default QuestionCard;
