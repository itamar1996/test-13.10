"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const TeacherSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        minlength: [5, 'Name too short. Must be at least 10 characters long']
    },
    password: {
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
                return validator_1.default.isEmail(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    role: {
        type: String,
        default: "student"
    },
    class: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "class"
    }
});
exports.default = mongoose_1.default.model("teacher", TeacherSchema);
