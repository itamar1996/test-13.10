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
const userModel_1 = __importDefault(require("../models/userModel"));
const userModel_2 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    static signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = user;
                const dbUser = new userModel_2.default({
                    username,
                    email,
                    password: yield bcrypt_1.default.hash(password, 10)
                });
                yield dbUser.save();
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
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.default.find({}).select('id username email');
                return {
                    err: false,
                    message: "Fetched users successfully",
                    status: 200,
                    data: users
                };
            }
            catch (error) {
                console.error("Error fetching users:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static getByUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ username }).select('id username email');
                if (!user) {
                    return {
                        err: true,
                        message: "User not found",
                        status: 404,
                        data: null
                    };
                }
                return {
                    err: false,
                    message: "Fetched user successfully",
                    status: 200,
                    data: user
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
exports.default = UserService;
