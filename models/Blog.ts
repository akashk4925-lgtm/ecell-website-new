import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  email: string;
  createdBy: string;
  blogName: string;
  blogSubheading: string;
  description: string;
}

const blogsSchema = new Schema<IBlog>(
  {
    email: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    blogName: {
      type: String,
      required: true,
    },
    blogSubheading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { collection: "allBlogs" }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogsSchema);

export default Blog;
