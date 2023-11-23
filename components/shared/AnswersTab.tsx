import { getUserAnswers } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: 1,
  });

  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  );
};

export default AnswersTab;
