"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import {
//   createPost,
//   getPosts,
//   getPost,
//   updatePost,
//   deletePost,
//   addComment,
// } from "../controllers/postController";
// import verifyUser from "../middleware/verifyUser";
const studentRouter = (0, express_1.Router)();
studentRouter.post("/"); //create user
studentRouter.get("/"); //get grades
studentRouter.get("/:id"); //get grade
exports.default = studentRouter;
