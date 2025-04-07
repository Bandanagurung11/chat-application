import mongoose from 'mongoose';

const connectDB = async () => {
 try{
     mongoose.connect(process.env.MONGODB_URL);
     console.log("databse connected sucessfully");
  }catch(error){
     console.log("mongodb connection fail");
  }
};

export default connectDB;
