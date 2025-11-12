import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWebsite extends Document {
  websiteName: string;
  websiteUrl: string;
  addedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const websiteSchema = new Schema<IWebsite>(
  {
    websiteName: { type: String, required: true, trim: true },
    websiteUrl: { type: String, required: true, trim: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Website: Model<IWebsite> =
  mongoose.models.Website || mongoose.model<IWebsite>("Website", websiteSchema);

export default Website;
