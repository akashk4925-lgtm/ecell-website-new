import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
  googleId?: string;
  firstName: string;
  lastName?: string;
  phone?: number;
  email: string;
  linkedin?: string;
  github?: string;
  password?: string;
  confirmPassword?: string;
  description?: string;
  Postbystudent?: mongoose.Types.ObjectId[];
}

const studentSchema = new Schema<IStudent>(
  {
    googleId: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    password: {
      type: String,
      required: false,
    },
    confirmPassword: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    Postbystudent: [
      {
        type: Schema.Types.ObjectId,
        ref: "Opportunity",
        default: [],
      },
    ],
  },
  { collection: "allStudents" }
);

const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);

export default Student;
