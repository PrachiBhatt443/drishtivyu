import connect from "@/utils/db";
import Feedback from "@/models/Feedback";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, feedbackType, subject, description, location } = await request.json();
  
  await connect();

  const feedback = new Feedback({
    name,
    feedbackType,
    subject,
    description,
    location
  });

  try {
    await feedback.save();
    return new NextResponse("Feedback has been created", { status: 201 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};

export const GET = async () => {
  await connect();

  try {
    const feedbacks = await Feedback.find();
    return NextResponse.json(feedbacks, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};
