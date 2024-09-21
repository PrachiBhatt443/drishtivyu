import connect from "@/utils/db";
import Feedback from "@/models/Feedback";
import User from "@/models/User";  // Import the User model
import { NextResponse } from "next/server";

// PUT: Update feedback to mark it as resolved
export const PUT = async (request, { params }) => {
  const { id } = params;
  const { name, resolved } = await request.json();  // Extract name and resolved from request body


  await connect();  // Ensure the database is connected

  try {
    // Step 1: Update the feedback by marking it resolved or not resolved
    const feedback = await Feedback.findByIdAndUpdate(id, { resolved: resolved }, { new: true });

    if (!feedback) {
      return new NextResponse("Feedback not found", { status: 404 });
    }

    // Step 2: Find the user by name and update their merits based on resolved status
    const user = await User.findOneAndUpdate(
      { name: name },
      { $inc: { merits: resolved ? 10 : -10 } },  // Increase by 10 if resolved, decrease by 10 if not
      { new: true }
    );

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({ feedback, user }, { status: 200 });

  } catch (err) {
    console.error("Error in updating feedback and user merits:", err);  // Log the error for debugging
    return new NextResponse(err.message, { status: 500 });
  }
};
