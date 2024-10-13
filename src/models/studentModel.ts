import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface ITest {
  name: string;
  grade: number;
}

export interface Istudent extends Document {
  name: string;
  email:string;
  password: string;
  role:string;
  class: Types.ObjectId;
  tests: ITest[];
}

const TestSchema = new mongoose.Schema<ITest>({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
 
});

const StudentSchema = new mongoose.Schema<Istudent>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  role:{
    type:String,
    default:"student"
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"class"
  },
  tests: [TestSchema] 
});


export default mongoose.model<Istudent>("Post",StudentSchema);
