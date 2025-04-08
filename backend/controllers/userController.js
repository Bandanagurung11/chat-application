import User from '../models/user.js';
import cloudinary from '../config/cloudinary.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        //check if username is already taken
     const yesUserExit = await User.findOne({username:req.body.username});
     if(yesUserExit){
       return res.status(409).json({message: "user already exist"});
     }
     console.log(req.file); 
     if (!req.file) {
       return res.status(400).json({ message: "No file uploaded" });
     }
     const password= req.body.password;
        // Hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     console.log(hashedPassword);
     const response = await cloudinary.uploader.upload(req.file.path);
     console.log(response, "Cloudinary response"); 
 
       const newUser = new User({
          ...req.body,
         password:hashedPassword ,
         profile: response.secure_url || null,
       });
   
       await newUser.save();
       res.status(201).json(newUser);
     } catch (error) {
       console.log(error);
       res.status(500).json({ message: 'Failed to create user', error });
     }
};

export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
      }
};

export const getUserById = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({message:"single user fetch sucessfully", data:user});

    } catch (error) {
        console.log("something went wrong",error);
        return res.status(500).json("internal server error");
    }
};

export const updateUser = async (req,res)=>{
    const userExit =await User.findById(req.params.id);
    if(!userExit){
        return res.status(404).json("user doesnot exist");
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
          return res.status(200).json({message:"user updated successfully", data:updatedUser})
        
    } catch (error) {
        console.log("something went wrong", error);
        return res.status(500).json("internal server error");
    }
};

export const userDelete = async (req,res)=>{
    const userExit = await User.findById(req.params.id);
    if(!userExit){
        return res.status(404).json("user not found");
    }
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"user deleted succefully", data:user});
    } catch (error) {
        console.log("something went wrong", error);
        res.status(500).json("internal server error");
    }
};

export const userLogin = async (req,res)=>{
  if (!req.body.username || !req.body.password) {
  return res.status(400).json({ message: "Username and password are required" });
}
    try {
  
      //check if username exist or not
      const yesUserNameExit = await User.findOne({username:req.body.username});
      if(!yesUserNameExit){
        return res.status(404).json({message: "user does not exit"})
      }
  
      //compare user password if user exist
      console.log(yesUserNameExit.password, "password from db");
      const passwordMatch = await bcrypt.compare(req.body.password, yesUserNameExit.password )  //1244 and !@241dc
      if(!passwordMatch){
        return res.status(401).json({message: "password doesn't match"});
      }
  
      //generate token
      // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
      const jwtToken = jwt.sign({username:req.body.username}, "!@E#@fvcnwevw$@$", {expiresIn: '24hr'});
      return res.status(200).json({
        message: "login successful",
        jwtToken: jwtToken,
        user : yesUserNameExit
      });
      
    } catch (error) {
      console.log(error,"error");
      return res.status(500).json({
        message: "Something went wrong",
        error: error,
      });

    }
}
