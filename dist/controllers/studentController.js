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
exports.getGrade = exports.getGrades = exports.handelRegister = void 0;
const postService_1 = __importDefault(require("../services/postService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create a new post
const handelRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield UserService.signup(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handelRegister = handelRegister;
const getGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        const result = yield postService_1.default.deleteByPostId(req.params.id, userId);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getGrades = getGrades;
const getGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService_1.default.getAllPosts();
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getGrade = getGrade;
