import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

import { v4 as uuidV4 } from 'uuid';

import dotenv from 'dotenv';

import NodeMailer from 'nodemailer'

const secret = 'test';

dotenv.config();

const transporter = NodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

export const getUsers = async (req, res) => {

  const data = await User.find();

  res.status(200).json(data);
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const signup = async (req, res) => {
  const { email, password, bio, firstName, lastName, ConfirmPassword, categoryOne, categoryTwo } = req.body;
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists. Proceed to login." });

    if(password.length < 7) return res.status(400).json({ message: "Password must be at least 7 characters long."});

    if(password !== ConfirmPassword) return res.status(400).json({ message: "Passwords do not match. Please try again."});

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ image: '', email, password: hashedPassword, name: `${firstName} ${lastName}`, categoryOne: categoryOne, categoryTwo: categoryTwo, bio: bio });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { image, bio, firstName, lastName, categoryOne, categoryTwo } = req.body;
  
  // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  const updatedUser = { image, name: `${firstName} ${lastName}`, bio, categoryOne, categoryTwo, _id: id };

  await User.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json(updatedUser);
}

export const forgotPassword = async (req, res) => {
  const {email, redirect} = req.body;

  User.find({email})
  .then((data) => {

    if(data.length) {
      sendResetEmail(data[0], redirect, res);
    }
    else {
      res.status(500).json({ message: "Could not find a user with that email." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: "Could not find a user with that email2." });
  })
}

const sendResetEmail = ({_id, email, name}, redirect, res) => {
  const mail = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset",
    html: `<p>Hi ${name},</p>

    <p>We got a request to reset your Readit password.</p>
    
    <p>Click on this <a href=${redirect + "/" + _id}>link</a> to reset.</p>
    
    <p>If you ignore this email, your password will not be changed. If you didn't request a password reset, your account may be compromised. You are adviced to change your password as soon as possible through your readit account.</p>
    
    <p>Thanks and regards,</p>
    <p>Readit</p>`
  }


  transporter.sendMail(mail)
  .then(() => {
    res.status(201).json({ message: "Reset link sent successfully to registered email." });
  })
}

export const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password, ConfirmPassword } = req.body;
  
  if(password.length < 7) return res.status(400).json({ message: "Password must be at least 7 characters long."});

  if(password !== ConfirmPassword) return res.status(400).json({ message: "Passwords do not match. Please try again."});

  const hashedPassword = await bcrypt.hash(password, 12);

  const updatedUser = { password: hashedPassword };
  

  await User.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json(updatedUser);
}