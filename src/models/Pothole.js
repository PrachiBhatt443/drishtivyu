import mongoose from "mongoose";

const { Schema } = mongoose;

const potholeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    resolved:{
        type:Boolean,
        default:false
    },
    location:{
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("Pothole", potholeSchema);
