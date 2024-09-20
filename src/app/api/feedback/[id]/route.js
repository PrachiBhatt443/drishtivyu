import connect from "@/utils/db";
import Feedback from "@/models/Feedback";
import { NextResponse } from "next/server";

// PUT: Update feedback to mark it as resolved
export const PUT = async (request, { params }) => {
  const { id } = params;
  const { resolved } = await request.json();
  await connect();
  
  await connect();

  try {
    const feedback = await Feedback.findByIdAndUpdate(id, { resolved: resolved }, { new: true });
    return NextResponse.json(feedback, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};
