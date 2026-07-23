import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGamaAdmin extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  postByGamaAdmin?: mongoose.Types.ObjectId[];
}

const gamaAdminSchema = new Schema<IGamaAdmin>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: false,
    },
    postByGamaAdmin: [
      {
        type: Schema.Types.ObjectId,
        ref: "NormalAdmin",
        default: [],
      },
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        default: [],
      },
      {
        type: Schema.Types.ObjectId,
        ref: "Schemes",
        default: [],
      },
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: [],
      },
      {
        type: Schema.Types.ObjectId,
        ref: "Startup",
        default: [],
      },
    ],
  },
  { collection: "allGamaAdmins" }
);

const GamaAdmin: Model<IGamaAdmin> =
  mongoose.models.GamaAdmin || mongoose.model<IGamaAdmin>("GamaAdmin", gamaAdminSchema);

export default GamaAdmin;
