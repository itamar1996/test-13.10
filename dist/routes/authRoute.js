"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { handleLogoutRequest,handleSigninRequest } from "../controllers/authControlller";
const router = (0, express_1.Router)();
router.post("/login");
router.delete('/logout');
exports.default = router;
