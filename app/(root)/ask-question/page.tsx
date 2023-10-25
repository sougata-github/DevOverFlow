import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.actions";
// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  // const { userId } = auth();

  const userId = "12345";

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question </h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser.id)} />
      </div>
    </div>
  );
};

export default Page;
