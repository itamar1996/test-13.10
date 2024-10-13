import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface ITeacher extends Document {
  _id: Types.ObjectId;
  Username: string;
  password:string;
  email: string;
  role:string;
  class: Types.ObjectId;
}

const TeacherSchema = new Schema<ITeacher>({
  Username: {
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
  role:{
    type:String,
    default:"teacher"
  },
  class:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Class"
  }
});

export default mongoose.model<ITeacher>("teacher", TeacherSchema);
