import bcrypt from "bcryptjs";
import Moderator from "../models/moderator.js";
// export const loginMod = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const oldUser = await Moderator.findOne({ email });
  
//       if (oldUser) return res.status(400).json({ message: "User already exists" });
  
//     //   if(password !== ConfirmPassword) return res.status(400).json({ message: "Passwords dont match"});
  
//       const hashedPassword = await bcrypt.hash(password, 12);
  
//       const result = await Moderator.create({ email, password: hashedPassword});
  
//     //   const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
  
//       res.status(201).json({ result });
//     } catch (error) {
//       res.status(500).json({ message: "Something went wrong" });
      
//       console.log(error);
//     }
//   };

export const loginMod = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await Moderator.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const moderator = true;

    res.status(200).json({ result: oldUser, moderator });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};