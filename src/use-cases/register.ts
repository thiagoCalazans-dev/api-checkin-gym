import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("E-mail alread exists.");
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    });
  }
}