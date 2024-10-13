"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import verifyUser from "../middleware/verifyUser";
const userRouter = (0, express_1.Router)();
userRouter.post("/");
userRouter.get("/");
userRouter.get("/:username");
exports.default = userRouter;
