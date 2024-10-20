import express, {urlencoded} from 'express'
import cookieParser from 'cookie-parser'
const app = express();

app.use(express.json({
    limit : "16kb"
}));

app.use(express.urlencoded({
    extended : true,
    limit : "16kb"
}));//this need to be study from chatgpt


app.use(cookieParser());

//routes import 
import userRouter from './routes/user.route.js'
import categoryRouter from './routes/category.route.js';
import podcastRouter from './routes/podcast.route.js';
//routes declerations

app.use('/api/v1/user',userRouter)
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/podcast',podcastRouter)


export {app}