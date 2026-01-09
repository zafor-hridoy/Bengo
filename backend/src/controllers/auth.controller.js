import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All field are must be filled" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must have 6 character minimum" })
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const user = await User.findOne({ email })
        if (user)
            return res.status(400).json({ message: "Email already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }
        else {
            res.status(400).json({ message: "Invalid User" })
        }
    } catch (error) {
        console.log("error: ", error)
        res.status(500).json({ message: "uneven error" })
    }

}
export const login = async (req, res) =>
{
    const { email,password} = req.body;

     if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

    try{
        const user = await User.findOne({email})
        if(!user)
            return res.status(400).json({message: "Invalid Email or Password"});
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) 
            return res.status(400).json({message: "Invalid Email or Password"});

        generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
    }catch(error)
    {
        console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (_, res) =>
{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({ message: "Logged out successfully" });
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic },
            { new: true }
        ).select("-password");

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};