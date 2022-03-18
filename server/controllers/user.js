import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const secret = 'test';

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
    res.status(400).json({ message: "Something went wrong" });
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