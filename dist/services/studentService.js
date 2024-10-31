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
const classModel_1 = __importDefault(require("../models/classModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class studentService {
    static signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, classname } = user;
                if (!username || !email || !password || !classname) {
                    return {
                        err: true,
                        message: "missing detales",
                        status: 400,
                    };
                }
                const classDoc = yield classModel_1.default.findOne({ name: classname });
                if (!classDoc) {
                    return {
                        err: true,
                        message: "class not found",
                        status: 400,
                    };
                }
                const dbUser = new studentModel_1.default({
                    Username: username,
                    email,
                    password: yield bcrypt_1.default.hash(password, 10),
                    class: classDoc._id
                });
                yield dbUser.save();
                classDoc.students.push(dbUser._id);
                yield classDoc.save();
                return {
                    err: false,
                    message: "created",
                    status: 200,
                    data: dbUser._id
                };
            }
            catch (error) {
                return {
                    err: true,
                    message: "server eror",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static GetGrades(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userGrades = yield studentModel_1.default.findById(studentId).select('tests');
                return {
                    err: false,
                    message: "Fetched grades successfully",
                    status: 200,
                    data: userGrades
                };
            }
            catch (error) {
                console.error("Error fetching grades:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static GetGrade(studentId, testId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const test = yield studentModel_1.default.findById(studentId).select('tests')
                    .findById(testId);
                if (!test) {
                    return {
                        err: true,
                        message: "test not found",
                        status: 404,
                        data: null
                    };
                }
                return {
                    err: false,
                    message: "Fetched test successfully",
                    status: 200,
                    data: test
                };
            }
            catch (error) {
                console.error("Error fetching user:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                    data: error
                };
            }
        });
    }
}
exports.default = studentService;
