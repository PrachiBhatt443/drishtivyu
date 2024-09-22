import connect from "@/utils/db";
import { NextResponse } from "next/server";
import Feedback from "@/models/Feedback";
import Pothole from "@/models/Pothole";

export const GET = async (request, { params }) => {
  const { name } = params;
  await connect();

  try {
    // Fetch unresolved and resolved feedback
    const unresolvedFeedback = await Feedback.find({ name, resolved: false });
    const resolvedFeedback = await Feedback.find({ name, resolved: true });

    // Fetch unresolved and resolved potholes
    const unresolvedPotholes = await Pothole.find({ name, resolved: false });
    const resolvedPotholes = await Pothole.find({ name, resolved: true });

    // Combine both feedback and pothole data
    const unresolved = [...unresolvedFeedback, ...unresolvedPotholes];
    const resolved = [...resolvedFeedback, ...resolvedPotholes];

    return NextResponse.json({ unresolved, resolved }, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};
