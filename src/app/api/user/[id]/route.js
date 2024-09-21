// /app/api/users/[name]/route.js
import connect from "@/utils/db"; // Ensure you have a proper db connection utility
import User from "@/models/User";
import { NextResponse } from "next/server";

// GET: Fetch a user by name
export const GET = async (request, { params }) => {
  const { id } = params; // Extract 'name' from the URL params
  await connect(); // Connect to the database
  try {
    const user = await User.findOne({ name: id });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};
