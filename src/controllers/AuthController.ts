import { NextFunction, Request, Response } from "express";
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const signToken = (id: any) => {
  return jwt.sign({ id }, "bearer", { expiresIn: "90d" });
};
interface CustomRequest extends Request {
  user: {
    _id: string;
    password: string;
    email: string;
    role: string;
  };
}

export const RegisterUser = async (req: Request, res: Response) => {
  const { name, email, password, confirmpassword, role } = req.body;
  // try {
  try {
    let newUser = await User.findOne({ email });

    if (newUser) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Email Already Exist" });
    }

    newUser = new User({
      name,
      email,
      password,
      confirmpassword,
      role,
    });
    await newUser.save();
    const token = signToken(newUser.id);
    return res.status(201).json({
      statusCode: 201,
      data: newUser,
      token,
      msg: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "please provide email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Email or password is incorrect" });
    }
    if (user.role === "user") {
      return res
        .status(401)
        .json({ statusCode: 401, msg: "Only Authorized user Can Login!" });
    }

    const token = signToken(user.id);
    res.status(200).json({
      statusCode: 200,
      status: "success",
      token,
      msg: "Logged in successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const ristrictTo = (...roles: any) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ statusCode: 401, msg: "Authorization Required" });
    }
    next();
  };
};
export const CheckAccess = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res
        .status(401)
        .json({ statusCode: 401, msg: "you are not Authorized" });
    }

    const decode = await promisify(jwt.verify)(token, "bearer");
    if (!decode) {
      return res.status(401).json({
        statusCode: 401,
        msg: "Session Expired Please login and try again!",
      });
    }
    const freshUser = await User.findById(decode.id);
    if (!freshUser) {
      return res.status(401).json({
        statusCode: 401,
        msg: "Session Expired Please login and try again!",
      });
    }
    req.user = freshUser;
    next();
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const UserRoute = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ statusCode: 404, msg: "User not found" });
    }
    res.status(200).json({
      user,
      status: "success",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const GetDetails = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.findById(req.user._id);
    await users.save();
    if (users) {
      return res.status(200).json({
        status: "success",
        data: users,
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const updatePassword = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.findById(req.user._id).select("+password");
    if (req.body.passwordCurrent !== "" && req.body.password !== "") {
      if (
        !(await users.correctPassword(req.body.passwordCurrent, users.password))
      ) {
        return res.status(401).json({
          statusCode: 401,
          msg: "your previous password does not match to your current password",
          error: true,
        });
      }
      users.password = req.body.password;
      users.confirmpassword = req.body.confirmpassword;
    }
    if (req.body.email) {
      users.email = req.body.email;
    }
    await users.save();
    if (users) {
      return res.status(200).json({
        status: "success",
        msg: "please login again!",
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
