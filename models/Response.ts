import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResponse extends Document {
  submission?: {
    originalFileName?: string;
    uploadedFileName?: string;
  };
  companyName: string;
  index: string;
  Student: mongoose.Types.ObjectId;
}

const responseSchema = new Schema<IResponse>(
  {
    submission: {
      originalFileName: {
        type: String,
        required: false,
      },
      uploadedFileName: {
        type: String,
        required: false,
      },
    },
    companyName: {
      type: String,
      required: true,
    },
    index: {
      type: String,
      required: true,
    },
    Student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true, collection: "allResponse" }
);

const ResponseModel: Model<IResponse> =
  mongoose.models.Response || mongoose.model<IResponse>("Response", responseSchema);

export default ResponseModel;
