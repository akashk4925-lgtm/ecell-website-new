import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOpportunity extends Document {
  responses?: mongoose.Types.ObjectId[];
  companyName: string;
  linkedinurl: string;
  websiteurl?: string;
  opportunityDescription: string;
  perks: string;
  skillsRequired: string[];
  stipend: number;
  duration: number;
  mode: string;
  numberOfAvailableSeats: number;
}

const opportunitySchema = new Schema<IOpportunity>(
  {
    responses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Response",
      },
    ],
    companyName: {
      type: String,
      required: true,
    },
    linkedinurl: {
      type: String,
      required: true,
    },
    websiteurl: {
      type: String,
    },
    opportunityDescription: {
      type: String,
      required: true,
    },
    perks: {
      type: String,
      required: true,
    },
    skillsRequired: [
      {
        type: String,
        required: true,
      },
    ],
    stipend: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    numberOfAvailableSeats: {
      type: Number,
      required: true,
    },
  },
  { collection: "allOpportunities" }
);

const Opportunity: Model<IOpportunity> =
  mongoose.models.Opportunity || mongoose.model<IOpportunity>("Opportunity", opportunitySchema);

export default Opportunity;
