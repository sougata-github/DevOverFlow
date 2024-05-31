import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is missing");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "DevOverFlow",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};

// const isConnected: boolean = false;

// export const connectToDatabase = async () => {
//   mongoose.set("strictQuery", true);

//   if (!process.env.MONGODB_URL) {
//     return console.log("MISSING MOGODB_URL");
//   }

//   if (isConnected) {
//     console.log("connected");
//   }

//   // we have a url and we are not connected
//   try {
//     await mongoose.connect(process.env.MONGODB_URL, {
//       dbName: "DevOverFlow",
//     });

//     isConnected = true;
//     console.log("mongodb is connected.");
//   } catch (error) {
//     console.log("Couldn't connect to mongodb ", error);
//   }
// };
