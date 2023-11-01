"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({
      clerkId: userId,
    });

    return user;
  } catch (error) {
    console.log(error);
  }
}

// creates a User in the Database
export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

// update user details
export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true, // new instance of that user
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// delete a user

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // if found then we have to delete the user and all his existing ties from the database

    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // delete the user's questions

    await Question.deleteMany({ author: user._id });

    // Todo: delete user answers,comments,etc

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
  }
}
