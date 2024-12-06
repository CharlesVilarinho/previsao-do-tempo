import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../entities/User";

export class AuthService {
  static async generateToken(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });
    return token;
  }

  static async comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
