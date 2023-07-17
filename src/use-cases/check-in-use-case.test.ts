import { expect, describe, it, beforeEach } from "vitest";

import { hash } from "bcryptjs";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckinUseCase } from "./check-in-use-case";

let checkinRepository: InMemoryCheckInsRepository;
let sut: CheckinUseCase;
//sut: System under test

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckInsRepository();
    sut = new CheckinUseCase(checkinRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "12312",
      userId: "uaisdhuias",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
