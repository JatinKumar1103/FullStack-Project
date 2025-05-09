import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { deleteProfile, getProfile, getPublicProfile, updateProfile } from "../controllers/profile.controller.js";


const router = Router();

router.route("/me").get(verifyJWT,getProfile)

router.route("/me").patch(verifyJWT,updateProfile)

router.route("/me").delete(verifyJWT,deleteProfile)

router.route("/:username").get(getPublicProfile);

export default router;