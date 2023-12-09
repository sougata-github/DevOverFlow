import { AnswerFilters } from "@/constants/filters";
import Filter from "./Filter";
import { getAnswers } from "@/lib/actions/answer.actions";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface Props {
  questionId: string;
  user: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  user,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers > 1 ? "Answers" : "Answer"}{" "}
        </h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result!.answers.length > 0 ? (
          result!.answers.map((answer) => (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="flex items-start justify-between">
                <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className="flex flex-1 items-start gap-1 sm:items-center"
                  >
                    <Image
                      src={answer.author.picture}
                      width={18}
                      height={18}
                      alt="profile"
                      className=" rounded-full object-cover max-sm:mt-0.5"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center ">
                      <p className="body-semibold text-dark300_light700">
                        {answer.author.name}
                      </p>

                      <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                        <span className="max-sm:hidden">{"    "} -</span>{" "}
                        answered {"  "} {getTimeStamp(answer.createdAt)}
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="flex ">
                  <Votes
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(user)}
                    upvotes={answer.upvotes.length}
                    hasUpvoted={answer.upvotes.includes(user)}
                    downvotes={answer.downvotes.length}
                    hasDownvoted={answer.downvotes.includes(user)}
                  />
                </div>
              </div>
              <ParseHTML data={answer.content} />
            </article>
          ))
        ) : (
          <p>No Answers yet</p>
        )}
      </div>
      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={result!.isNext} />
      </div>
    </div>
  );
};

export default AllAnswers;
