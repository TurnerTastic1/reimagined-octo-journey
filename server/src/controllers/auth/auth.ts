import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwtMiddleware from '../../middleware/authJwt';


import User from '../../models/user.model';

const signupController = async (req: Request, res: Response) => {
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword || undefined
  });
  try {
    const savedUser = await user.save();
    if (savedUser) res.send('User registered successfully!'); // Need if statement for eslint rules
  } catch (err) {
    res.status(400).send(err);
  }

};

const signinController = async (req: Request, res: Response) => {
  // Checking if user/email exists and is in DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({"error": "Email is not associated with any known accounts"});

  // Checking if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({"error": "Invalid password"});

  // Create and assign token
  const token = await jwtMiddleware.createValidJwt(JSON.stringify(user._id));
  //console.log(token.);
  res.status(200).json({
    "message": "Logged in",
    "token": token,
    "user": {
      "id": user.id,
      "name": user.name,
      "email": user.email,
      "data": user.data
    }
  });
};

export default { signupController, signinController };