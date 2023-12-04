import React from "react";
import Link from "next/link";
import RenderTags from "../shared/RenderTags";
import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  clerkId?: string | null;
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    clerkId: string;
    name: string;
    picture: string;
  };
  views: number;
  upvotes: string[];
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  views,
  upvotes,
  createdAt,
  answers,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper mt-4 rounded-[10px] p-9 xs:mt-2 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row  ">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden ">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1 ">
              {title}
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2 ">
        {tags.map((tag) => (
          <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3 ">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`- asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            title="Vote"
            value={formatNumber(upvotes.length)}
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
