import React from "react";
import Link from "next/link";
import RenderTags from "../shared/RenderTags";
import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";

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
            {getTimeStamp(createdAt)}
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
      <div className="mt-6 flex w-full flex-wrap justify-between">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`- asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author._id}`}
          textStyles="body-medium text-dark400_light700"
        />
        <div className="mt-1 flex gap-4 py-2">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            title="Vote"
            value={formatNumber(upvotes)}
            textStyles="small-medium text-dark400_light800 "
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumber(answers.length)}
            title="Answer"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatNumber(views)}
            title="View"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
