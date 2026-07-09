import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

export async function GET() {
  const result = {
    success: false,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,

    mongodb: {
      uriExists: !!process.env.MONGODB_URI,
      uriPreview: process.env.MONGODB_URI
        ? process.env.MONGODB_URI.replace(/\/\/(.*?):(.*?)@/, "//***:***@")
        : null,
    },

    mongoose: {
      version: mongoose.version,
      readyState: mongoose.connection.readyState,
    },

    server: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
    },
  };

  try {
    const start = Date.now();

    await connectDB();

    const end = Date.now();

    result.success = true;

    result.database = {
      connected: true,
      dbName: mongoose.connection.name,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      readyState: mongoose.connection.readyState,
      connectionTime: `${end - start} ms`,
    };

    return Response.json(result, { status: 200 });
  } catch (error) {
    result.database = {
      connected: false,
    };

    result.error = {
      name: error.name,
      message: error.message,
      code: error.code || null,
      cause: error.cause?.message || null,
      labels: error.errorLabelSet
        ? [...error.errorLabelSet]
        : [],
      stack:
        process.env.NODE_ENV === "development"
          ? error.stack
          : "Hidden in production",
    };

    return Response.json(result, { status: 500 });
  }
}