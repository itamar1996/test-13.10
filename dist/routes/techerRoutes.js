"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("../controllers/teacherController");
const onlyTeacher_1 = __importDefault(require("../middleware/onlyTeacher"));
// import verifyUser from "../middleware/verifyUser";
const techerRoute = (0, express_1.Router)();
techerRoute.post("/", teacherController_1.handelRegister); //create user
techerRoute.post("/grades", onlyTeacher_1.default, teacherController_1.handelAddGrade); //add grade
techerRoute.get("/grades", onlyTeacher_1.default, teacherController_1.handelGetGrades); //get grades for class
techerRoute.get("/grades/avg", onlyTeacher_1.default, teacherController_1.handelGetAVG); //get avg grades
techerRoute.get("/grades/:id", onlyTeacher_1.default, teacherController_1.handelGetGrade); //get grades for student
techerRoute.patch("/", onlyTeacher_1.default, teacherController_1.handelEditeGrade); //edite grade for student
exports.default = techerRoute;
