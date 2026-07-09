import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined.");
}

// Global cache
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  // Return existing connection
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection.");
    return cached.conn;
  }

  // Create new connection
  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");
    console.log(
      "📌 URI:",
      MONGODB_URI.replace(/\/\/(.*?):(.*?)@/, "//***:***@")
    );

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "vnet",
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 20000,
        maxPoolSize: 10,
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB Connected Successfully");
        console.log("Host:", mongooseInstance.connection.host);
        console.log("Database:", mongooseInstance.connection.name);

        return mongooseInstance;
      })
      .catch((error) => {
        console.error("❌ MongoDB Connection Failed");
        console.error("Name:", error.name);
        console.error("Message:", error.message);

        if (error.code) {
          console.error("Code:", error.code);
        }

        if (error.cause) {
          console.error("Cause:", error.cause.message);
        }

        cached.promise = null;

        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}