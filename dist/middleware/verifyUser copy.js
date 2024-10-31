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
const onlyTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // @ts-ignore
        const token = String(((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.auth_token) || "");
        if (!token) {
            res.status(401).json({ message: "Token missing" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "teacher") {
            res.status(403).json({ message: "Access denied, only teachers allowed" });
            return;
        }
        //@ts-ignore
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error("Error verifying token:", err);
        res.status(401).json({ message: "Unauthorized" });
    }
});
exports.default = onlyTeacher;
