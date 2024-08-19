import Users from "../model/usermodel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill all details" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    const user = await Users.create({
      username,
      email,
      password :hashedPassword,
      confirmPassword : hashedConfirmPassword,
    });
    console.log(user)
    const token = await generateToken(user._id);

    if (user) {
      return res.status(201).json({
        message: "Registration Successful",
        token:token,
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
          confirmPassword: user.confirmPassword,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all details" });
    }

    const user = await Users.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect  password" });
    }

    const token = await generateToken(user._id);

    return res.status(200).json({
      message: "Login Successful",
      token: token,
      data: user
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error, please try again later." });
  }
};



export async function generateToken(id,secret){
    console.log(id)
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:'30d'})
}