import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHelp extends Document {
  firstName: string;
  email: string;
  description: string;
}

const HelpSchema = new Schema<IHelp>(
  {
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { collection: "help" }
);

const Help: Model<IHelp> =
  mongoose.models.help || mongoose.model<IHelp>("help", HelpSchema);

export default Help;
