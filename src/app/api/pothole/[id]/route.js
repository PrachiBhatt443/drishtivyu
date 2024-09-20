import Pothole from "@/models/Pothole";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
    const { id } = params;
    const { resolved } = await request.json();
    await connect();
    
    try {
        const updatedComplaint = await Pothole.findByIdAndUpdate(
        id,
        { resolved },
        { new: true }
        );
        return NextResponse.json(updatedComplaint, { status: 200 });
    } catch (err) {
        return new NextResponse(err.message, { status: 500 });
    }
};