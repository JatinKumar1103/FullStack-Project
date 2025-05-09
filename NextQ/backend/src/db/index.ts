import mongoose from 'mongoose'

const connectDB = async () : Promise<void> => {
    try{
        if(!process.env.MONGODB_URI || !process.env.DB_NAME){
            throw new Error('Missing required environment variables')
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("MongoDB Connected Successfully !!!")
    }catch(err){
        console.error("MongoDB Connect Failed !!!",err);
        process.exit(1);
    }
}

export default connectDB;
