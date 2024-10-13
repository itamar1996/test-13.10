import {Router } from "express";
import { handleLogoutRequest,handleSigninRequest } from "../controllers/authControlller";

const router : Router = Router();


router.post("/login",handleSigninRequest );

router.delete('/logout',handleLogoutRequest)

export default router