"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
// import verifyUser from "../middleware/verifyUser";
const studentRouter = (0, express_1.Router)();
studentRouter.post("/", studentController_1.handelRegister); //create user
studentRouter.get("/", studentController_1.handelGetGrades); //get grades
studentRouter.get("/:id", studentController_1.handelGetGrade); //get grade
exports.default = studentRouter;
