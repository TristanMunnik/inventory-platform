import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const signToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const userResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Role is NOT taken from the request, so nobody can sign up as admin
  const user = await User.create({ name, email, password });
  res.status(201).json({ token: signToken(user), user: userResponse(user) });
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    // Same message for both cases so attackers can't tell which was wrong
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ token: signToken(user), user: userResponse(user) });
});

// GET /api/auth/me
export const me = (req, res) => res.json({ user: userResponse(req.user) });