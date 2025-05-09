import dotenv from 'dotenv'
import connectDB from './db/index.js';
import { app } from './app.js';


dotenv.config({
   path:'./.env' 
});

connectDB()
.then(()=>{
    const PORT : number = parseInt(process.env.PORT || "3000",10)
    app.listen(PORT,()=>{
        console.log(`Server is running at ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.error('Error connecting to database',err)
    process.exit(1)  // Exit the process with an error status code
})