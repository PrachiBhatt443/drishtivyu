import mongoose from "mongoose";

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  feedbackType: {
    type: String,
    enum: ['Suggestion', 'Complaint', 'Inquiry', 'Bug Report', 'Other'],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};
export default mongoose.model("Feedback", feedbackSchema);
