
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
 const ConnectDB = async () => {
    try{
    const conn = mongoose.createConnection(process.env.MONGO_URI);
    // console.log(`connection created at ${conn.connection.host}`);
    console.log("done");
    
    
}
catch(error){
    console.log(`error is that ${error.message}`);
    process.exit(1)
    
}
 } 
 export default ConnectDB;