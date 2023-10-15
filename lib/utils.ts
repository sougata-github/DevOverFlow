import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const diffInSeconds: number = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes: number = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 86400) {
    const diffInHours: number = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 604800) {
    // Less than a week (7 days)
    const diffInDays: number = Math.floor(diffInSeconds / 86400);
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 31536000) {
    // Less than a year (365 days)
    const diffInWeeks: number = Math.floor(diffInSeconds / 604800);
    return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`;
  } else {
    const diffInYears: number = Math.floor(diffInSeconds / 31536000);
    return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
  }
};

export const formatNumber = (number: number): string => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};
