import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import { assignAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.route('/assign').post(verifyJWT,verifyAdmin,assignAdmin)

export default router;