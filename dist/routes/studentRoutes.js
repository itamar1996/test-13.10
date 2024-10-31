"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const onlyStudent_1 = __importDefault(require("../middleware/onlyStudent"));
// import verifyUser from "../middleware/verifyUser";
const studentRouter = (0, express_1.Router)();
studentRouter.post("/", studentController_1.handelRegister); //create user
studentRouter.get("/", onlyStudent_1.default, studentController_1.handelGetGrades); //get grades
studentRouter.get("/:id", onlyStudent_1.default, studentController_1.handelGetGrade); //get grade
exports.default = studentRouter;
