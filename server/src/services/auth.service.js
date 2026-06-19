import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import AppError from "../utils/AppError.js";

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
}

export default new AuthService();
