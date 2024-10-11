import { connect, connection as mongooseConnection } from "mongoose";

export async function connection() {
  try {
    if (mongooseConnection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    await connect(process.env.MONGO_URL as string);

    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
