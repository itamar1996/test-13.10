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
exports.handleLogoutRequest = exports.handleSigninRequest = void 0;
const authService_1 = __importDefault(require("../services/authService"));
const handleSigninRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield authService_1.default.login(req.body);
        if (result.err) {
            res.status(200).json(result);
            return;
        }
        console.log(result);
        res.cookie('auth_token', (_a = result.data) === null || _a === void 0 ? void 0 : _a.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.status(200).json(result);
    }
    catch (error) {
        console.log("Server error:", error);
        res.status(400).json(error);
    }
});
exports.handleSigninRequest = handleSigninRequest;
const handleLogoutRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({ message: 'logout ' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.handleLogoutRequest = handleLogoutRequest;
