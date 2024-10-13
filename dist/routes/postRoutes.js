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
const postRouter = (0, express_1.Router)();
postRouter.post("/");
postRouter.get("/");
postRouter.get("/:id");
postRouter.put("/:id");
postRouter.delete("/:id");
postRouter.post("/:id/comments");
exports.default = postRouter;
