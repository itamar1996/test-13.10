"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import verifyUser from "../middleware/verifyUser";
const techerRoute = (0, express_1.Router)();
techerRoute.post("/"); //create user
techerRoute.post("/grades"); //add grade
techerRoute.get("/"); //get grades for class
techerRoute.get("/avg"); //get avg grades
techerRoute.get("/:id"); //get grades for student
techerRoute.patch("/"); //edite grade for student
exports.default = techerRoute;
