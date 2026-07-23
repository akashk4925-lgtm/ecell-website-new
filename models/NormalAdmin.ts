import mongoose, { Schema, Document, Model } from "mongoose";

export interface INormalAdmin extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  postByNormalAdmin?: mongoose.Types.ObjectId[];
}

const normalAdminSchema = new Schema<INormalAdmin>(
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
    postByNormalAdmin: [
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
        ref: "Startup",
        default: [],
      },
    ],
  },
  { collection: "allNormalAdmins" }
);

const NormalAdmin: Model<INormalAdmin> =
  mongoose.models.NormalAdmin || mongoose.model<INormalAdmin>("NormalAdmin", normalAdminSchema);

export default NormalAdmin;
