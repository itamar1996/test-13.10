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
exports.handelGetGrade = exports.handelGetGrades = exports.handelAddGrade = exports.handelRegister = void 0;
const techerService_1 = __importDefault(require("../services/techerService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handelRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield techerService_1.default.signup(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handelRegister = handelRegister;
const handelAddGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const teacherId = decodedToken.id;
        const result = yield techerService_1.default.addGrade(req.body, teacherId);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handelAddGrade = handelAddGrade;
const handelGetGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const teacherId = decodedToken.id;
        const result = yield techerService_1.default.GetGrades(teacherId);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handelGetGrades = handelGetGrades;
// export const handelGetAVG = async (req: Request, res: Response):Promise<void> => {
//     try {
//         const token = req.cookies.auth_token;
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
//         const teacherId = (decodedToken as any).id;
//         const result =  await techerService.GetAVG(teacherId);               res.status(200).json(result)
//     } catch (error) {
//         console.log(error);
//     }
// };
const handelGetGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const teacherId = decodedToken.id;
        const result = yield techerService_1.default.GetGrade(teacherId, req.params.id);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handelGetGrade = handelGetGrade;
// export const handelEditeGrade = async (req: Request, res: Response):Promise<void> => {
//     try {
//         const result =  await UserService.getByUserName(req.params.username);
//         res.status(200).json(result)
//     } catch (error) {
//         console.log(error);
//     }
// };
