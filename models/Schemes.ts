import mongoose, { Schema, Document, Model } from "mongoose";

export interface IScheme extends Document {
  schemeName: string;
  schemeType: string;
  funding?: number;
  description: string;
}

const schemesSchema = new Schema<IScheme>(
  {
    schemeName: {
      type: String,
      required: true,
    },
    schemeType: {
      type: String,
      required: true,
    },
    funding: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { collection: "allSchemes" }
);

const Schemes: Model<IScheme> =
  mongoose.models.Schemes || mongoose.model<IScheme>("Schemes", schemesSchema);

export default Schemes;
