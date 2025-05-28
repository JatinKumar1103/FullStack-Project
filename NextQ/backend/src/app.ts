import express,{Express} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app : Express = express();



app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials :true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended : true,
    limit : "16kb"
}));

app.use(cookieParser());

import userRouter from './routes/user.routes.js';

app.use('/api/v1/user', userRouter);

import profileRouter from './routes/profile.routes.js'

app.use('/api/v1/user/profile',profileRouter);

import adminRouter from './routes/admin.routes.js'
app.use('/api/v1/admin',adminRouter)

// Health Check Endpoint for server status 
app.get("/healthCheck", (req, res) => {
    console.log("Server is running perfectly...");
    res.send("Server is running perfectly...");
})

export {app}