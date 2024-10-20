import {Router} from 'express'
import { addCategory } from '../controllers/category.controller.js'

const categoryRouter = Router();

categoryRouter.route('/addcategory').post(addCategory)

export default categoryRouter