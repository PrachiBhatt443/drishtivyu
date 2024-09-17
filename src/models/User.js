import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    // email: {
    //   type: String,
    //   unique: true,
    //   required: true,
    // },
    admin:{
      type:Boolean,
      default:false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("User", userSchema);
