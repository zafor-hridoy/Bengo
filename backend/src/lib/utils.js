import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
  const JWT_SECRET = ENV.JWT_SECRET;
=======
  const { JWT_SECRET } = ENV;
>>>>>>> 856d621 (signup error solved)
=======
  const JWT_SECRET = ENV.JWT_SECRET;
>>>>>>> 4104a48 (yes)
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 604800000,
    httpOnly: true,
    sameSite: "strict",
<<<<<<< HEAD
<<<<<<< HEAD
    secure: ENV.NODE_ENV !== "development",
=======
    secure: ENV.NODE_ENV === "development" ? false : true,
>>>>>>> 856d621 (signup error solved)
=======
    secure: ENV.NODE_ENV !== "development",
>>>>>>> 4104a48 (yes)
  });

  return token;
};