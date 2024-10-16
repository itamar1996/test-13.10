"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("../controllers/teacherController");
// import verifyUser from "../middleware/verifyUser";
const techerRoute = (0, express_1.Router)();
techerRoute.post("/", teacherController_1.handelRegister); //create user
techerRoute.post("/grades", teacherController_1.handelAddGrade); //add grade
techerRoute.get("/grades", teacherController_1.handelGetGrades); //get grades for class
techerRoute.get("/grades/avg", teacherController_1.handelGetAVG); //get avg grades
techerRoute.get("/grades/:id", teacherController_1.handelGetGrade); //get grades for student
techerRoute.patch("/", teacherController_1.handelEditeGrade); //edite grade for student
exports.default = techerRoute;
