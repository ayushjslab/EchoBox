import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFeedback extends Document {
  name: string;
  email: string;
  description: string;
  rating: 1 | 2 | 3 | 4 | 5;
  website: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const feedbackSchema = new Schema<IFeedback>(
  {
    name: { type: String, required: true, trim: true },
    email: {type: String, required: true, unique: true},
    description: { type: String, required: true, trim: true },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    website: {
      type: Schema.Types.ObjectId,
      ref: "Website",
      required: true,
    },
  },
  { timestamps: true }
);

const Feedback: Model<IFeedback> =
  mongoose.models.Feedback ||
  mongoose.model<IFeedback>("Feedback", feedbackSchema);

export default Feedback;
