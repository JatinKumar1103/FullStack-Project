import express, {urlencoded} from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

app.use(express.json({
    limit : "16kb"
}));

app.use(express.urlencoded({
    extended : true,
    limit : "16kb"
}));//this need to be study from chatgpt

app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
     // Frontend's URL
     credentials: true, // enable set cookie
     secure: false // use http for development
};
app.use(cors(corsOptions))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/test-static', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src/uploads/pxfuel (1).jpg'));
});


//routes import 
import userRouter from './routes/user.route.js'
import categoryRouter from './routes/category.route.js';
import podcastRouter from './routes/podcast.route.js';
//routes declerations

app.use('/api/v1/user',userRouter)
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/podcast',podcastRouter)


export {app}