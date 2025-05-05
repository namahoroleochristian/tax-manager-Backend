
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()



 const ConnectDB = async () => {

    try{
        //the reason why this connection works is that the IP address in the connection string is 127.0.0.1 instead of localhost (which is the bindIp in mongod.cfg)
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connection created at ${conn.connection.host}`);
    
    
    
}
catch(error){
    console.log(`error is that ${error.message}`);
    process.exit(1)
    
}
 } 
 export default ConnectDB;