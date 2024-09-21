import Pothole from "@/models/Pothole";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
    const { id } = params;
    const { name, resolved } = await request.json();
    
    // Connect to the database
    await connect();

    try {
        // Update the pothole complaint status
        const updatedComplaint = await Pothole.findByIdAndUpdate(
            id,
            { resolved },
            { new: true }
        );

        if (!updatedComplaint) {
            return new NextResponse("Complaint not found", { status: 404 });
        }

        // Update user merit points
        const user = await User.findOneAndUpdate(
            { name: name },
            { $inc: { merits: resolved ? 10 : -10 } }, // Adjust merit points based on resolved status
            { new: true }
        );

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Successful response with updated user and complaint
        return NextResponse.json({ user, updatedComplaint }, { status: 200 });

    } catch (err) {
        console.error("Error in PUT request:", err);  // Log the error
        return new NextResponse("An error occurred while updating the complaint or user: " + err.message, { status: 500 });
    }
};
