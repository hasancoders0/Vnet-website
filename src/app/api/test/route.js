import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    return Response.json({
      success: true,
      message: "MongoDB Connected Successfully ✅",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Connection Failed ❌",
      error: error.message,
    });
  }
}