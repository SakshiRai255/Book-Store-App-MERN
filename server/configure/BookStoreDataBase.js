import mongoose from "mongoose";
mongoose.set('strictQuery', true);

const connectToDataBase = () =>{
    mongoose.connect(process.env.MONGO_URL)
    .then((conn)=>{
        console.log(`Connect to DataBase : ${conn.connection.host}`);
    })
    .catch((error)=>{
        console.log(error.message);
        process.exit(1);
    });
}
export default connectToDataBase