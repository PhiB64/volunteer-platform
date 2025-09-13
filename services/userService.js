import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register({ name, email, password, role }) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email déjà utilisé");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const assignedRole = await this.userRepository.assignRole(newUser.id, role);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: assignedRole,
    };
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Mot de passe incorrect");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { token, user: { id: user.id, name: user.name, role: user.role } };
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id) {
    return await this.userRepository.findById(id);
  }

  async getUsersByRole(roleName) {
    return await this.userRepository.findByRole(roleName);
  }

  async deleteUser(id) {
    const affected = await this.userRepository.deleteById(id);
    if (affected === 0) {
      throw new Error("Utilisateur introuvable");
    }
  }
}
