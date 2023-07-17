import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository";

import { hash } from "bcryptjs";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";

let userRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;
//sut: System under test

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });

  it("should to get user profile", async () => {
    const createdUser = await userRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to get user profile with wrong id", async () => {
    expect(() =>
      sut.execute({
        userId: "wrong id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
