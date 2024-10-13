"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const TestSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
});
const StudentSchema = new mongoose_1.default.Schema({
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
        validate: {
            validator: function (v) {
                return validator_1.default.isEmail(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    class: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "class"
    },
    tests: [TestSchema]
});
exports.default = mongoose_1.default.model("Post", StudentSchema);
