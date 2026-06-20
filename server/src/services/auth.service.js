import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import AppError from "../utils/AppError.js";
import { generateAccessToken } from "../utils/jwt.js";

class AuthService {
  // Service methods for authentication logic
  async register(userData) {
    // Implement registration logic, e.g., hashing password, saving user to database

    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new AppError("Email already in use", 409);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }

  async login(userData) {
    // Implement login logic, e.g., verifying user credentials, generating JWT token
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    };
  }
}

export default new AuthService();
