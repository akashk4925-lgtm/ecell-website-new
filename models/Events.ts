import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  link?: string;
  startDate: Date;
  internalStartDate: Date;
  endDate: Date;
  internalEndDate: Date;
  createdBy?: string;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    internalStartDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    internalEndDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      required: false,
    },
  },
  { collection: "allBlogs" }
);

const Events: Model<IEvent> =
  mongoose.models.Events || mongoose.model<IEvent>("Events", eventSchema);

export default Events;
