import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStartup extends Document {
  Name: string;
  website: string;
  founders: unknown[];
  currentStatus: string;
  yearOfGraduation: string;
  domain: string;
  description: string;
  avatar?: {
    data?: Buffer;
    contentType?: string;
  };
}

const startupSchema = new Schema<IStartup>(
  {
    Name: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    founders: {
      type: Array,
      required: true,
    },
    currentStatus: {
      type: String,
      required: true,
    },
    yearOfGraduation: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avatar: {
      data: Buffer,
      contentType: String,
    },
  },
  { collection: "allStartups" }
);

const Startup: Model<IStartup> =
  mongoose.models.Startup || mongoose.model<IStartup>("Startup", startupSchema);

export default Startup;
