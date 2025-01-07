import {Router} from 'express';
import { addPodcast,getPodcast,podcastByCategory,podcastById,userPodcast } from '../controllers/podcast.controller.js';
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';


const podcastRouter = Router();

podcastRouter.route('/addpodcast').post(upload.fields([
    {
        name:'frontImage',
        maxCount:1
    },
    {
        name: 'audioFile',
        maxCount:1
    }
]), verifyJWT, addPodcast)

podcastRouter.route('/getpodcast').get(getPodcast)

podcastRouter.route('/getUserPodcasts').get(verifyJWT, userPodcast)

podcastRouter.route('/getPodcast/:id').get(podcastById);

podcastRouter.route('/category/:cat').get(podcastByCategory);




export default podcastRouter