import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: UserCreateInput): Promise<User>;
}

type UserCreateInput = {
  id?: string | undefined;
  name: string;
  email: string;
  password_hash: string;
  created_at?: string | Date | undefined;
};
