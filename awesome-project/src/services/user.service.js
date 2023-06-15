import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../mailservice/user.reset.password';
import { producer } from '../utils/rabbit.producer';
import users from '../config/database.js'
import userModel from '../models/user.model.js'
//Login  users by Email
export const login = async (body) => {

console.log("body in login",body);
    const response = await users.where('email','==', body.email).get();
const data =response.docs.map((doc)=>({id:doc.id, ...doc.data(),}))
console.log("data is= ",data);

if(data){
    const PasswordMatch= await bcrypt.compare(body.password,data[0].password);
  
  if(PasswordMatch){
  let token = jwt.sign({ email: body.email,id:data[0].id}, process.env.SECRET_KEY);
  return token;
  }
  else{
  throw new Error("Invalid Password");
      }
}

};  

//create new user
export const Register = async (body) => {
  
  const HashPassword=await bcrypt.hash(body.password,12);
  body.password=HashPassword;
  const user = userModel.userSchema(body);
    const docRef = await users.add(user.toFirestore());
   console.log("docref:",docRef);
   const docSnapshot = await docRef.get();
    console.log("docsnapshot:",docSnapshot);
    const addedUser = userModel.getUserFromFirestore(docSnapshot);

    return addedUser;
};

//forgot password
export const forgotPassword = async (body) => {

const response = await users.where('email','==',body.email).get();
console.log("response of rorgot pass= ",response);
const data =response.docs.map((doc)=>({id:doc.id, ...doc.data(),}))
console.log("data in forgot=",data);
if(data.length){
  let token = jwt.sign({ email: data.email, id:data._id}, process.env.SECRET_KEY_RESET);
  const res =sendEmail(body.email,token);
  return res;
  }
else{
      throw new Error("Invalid Email");
    }
 };
 
//update password
export const resetPassword = async (body) => {
  
  const HashPassword=await bcrypt.hash(body.password,12);
  body.password=HashPassword;

  const updated=await user.doc(id).update(note.toFirestore())

  
};

