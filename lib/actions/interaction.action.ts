"use server";

import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";

import { ViewQuestionParams } from "./shared";

import { connectToDatabase } from "../mongoose";

import { revalidatePath } from "next/cache";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId, path } = params;

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return;

      // update view count
      await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

      // create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
