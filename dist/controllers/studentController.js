"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelGetGrade = exports.handelGetGrades = exports.handelRegister = void 0;
const studentService_1 = __importDefault(require("../services/studentService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create a new post
const handelRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield studentService_1.default.signup(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handelRegister = handelRegister;
const handelGetGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const studentId = decodedToken.id;
        const result = yield studentService_1.default.GetGrades(studentId);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handelGetGrades = handelGetGrades;
const handelGetGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const studentId = decodedToken.id;
        const result = yield studentService_1.default.GetGrade(studentId, req.params.id);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handelGetGrade = handelGetGrade;
