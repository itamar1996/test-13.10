"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControlller_1 = require("../controllers/authControlller");
const router = (0, express_1.Router)();
router.post("/login", authControlller_1.handleSigninRequest);
router.delete('/logout', authControlller_1.handleLogoutRequest);
exports.default = router;
