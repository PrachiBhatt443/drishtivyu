import connect from "@/utils/db";
import { NextResponse } from "next/server";
import Pothole from "@/models/Pothole";

export const POST =async(request)=>{
    const {location,name}=await request.json();
    await connect();
    const complaint=new Pothole({
        name,
        location
    })
    try{
       await complaint.save();
       return new NextResponse("Complaint has been created",{
        status:201. 
       })
    }catch(err){
        return new NextResponse(err.message,{
            status:500,
        })
    }
}

export const GET = async () => {
    await connect();
    try {
      const complaints = await Pothole.find();
      return NextResponse.json(complaints, { status: 200 });
    } catch (err) {
      return new NextResponse(err.message, { status: 500 });
    }
};
