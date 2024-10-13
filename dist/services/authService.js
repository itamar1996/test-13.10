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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    static login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = userData;
                if (!password || !username) {
                    return {
                        err: true,
                        message: "missing detles",
                        status: 400
                    };
                }
                let user = yield studentModel_1.default.findOne({ username }).select('+password');
                if (!user) {
                    user = yield teacherModel_1.default.findOne({ username }).select('+password');
                }
                if (!user) {
                    return {
                        err: true,
                        message: "user not found",
                        status: 400
                    };
                }
                const passresult = yield bcrypt_1.default.compare(password, user.password);
                if (!passresult) {
                    return {
                        err: true,
                        message: "password not corect",
                        status: 400
                    };
                }
                const payload = {
                    username,
                    id: user.id,
                    role: user.role
                };
                const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "10m"
                });
                return {
                    err: false,
                    status: 200,
                    data: {
                        token
                    }
                };
            }
            catch (error) {
                return {
                    err: true,
                    message: "Missing madatory data",
                    status: 500,
                    data: error
                };
            }
        });
    }
}
exports.default = AuthService;
