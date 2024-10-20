import {Router} from 'express'
import {registerUser,loginUser,logoutUser,checkCookies,getUserDetails} from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = Router();

router.route("/signup").post(registerUser)

router.route('/signin').post(loginUser)

router.route('/logout').post(logoutUser)

router.route('/checkcookie').get(checkCookies)

router.route('/user').post(verifyJWT,getUserDetails);


export default router;