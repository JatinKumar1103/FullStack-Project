import {Router} from 'express';
import { changeCurrentPassword, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails } from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';


const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/auth/refresh").post(verifyJWT,refreshAccessToken)

router.route("/password").patch(verifyJWT,changeCurrentPassword)

router.route("/update").patch(verifyJWT,updateAccountDetails)



export default router;