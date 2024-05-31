"use client";

const error = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-center text-base font-medium text-black dark:text-white">
        Oops! Something went wrong. Please try again later.
      </p>
    </div>
  );
};

export default error;
