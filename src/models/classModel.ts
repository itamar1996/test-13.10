import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass extends Document {
  name: string;
  avg: number;
  students: Types.ObjectId[];
}

const ClassSchema = new mongoose.Schema<IClass>({
  name: {
    type: String,
    required: true,
  },
  avg: {
    type: Number,
    required: false,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    }
  ],
});

export default mongoose.model<IClass>("Class", ClassSchema);


