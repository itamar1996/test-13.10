import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface ITeacher extends Document {
  name: string;
  password:string;
  email: string;
  class: Types.ObjectId;
}

const TeacherSchema = new Schema<ITeacher>({
  name: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    minlength: [5, 'Name too short. Must be at least 10 characters long']
  },
  password:{
    type: String,
    required: [true, 'password is required'],
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  class:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"class"
  }
});

export default mongoose.model<ITeacher>("teacher", TeacherSchema);
