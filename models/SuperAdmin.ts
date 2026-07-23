import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISuperAdmin extends Document {
  email: string;
  password: string;
}

const superAdminSchema = new Schema<ISuperAdmin>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "allSuperAdmins" }
);

const SuperAdmin: Model<ISuperAdmin> =
  mongoose.models.SuperAdmin || mongoose.model<ISuperAdmin>("SuperAdmin", superAdminSchema);

export default SuperAdmin;
