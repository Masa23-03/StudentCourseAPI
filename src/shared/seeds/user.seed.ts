import { faker } from "@faker-js/faker";
import { Prisma, Role } from "../../generated/prisma";

export function makeRandomUser(
  role: Role,
  overrides: Partial<Prisma.UserUncheckedCreateInput> = {}
): Prisma.UserUncheckedCreateInput {
  const randomUser: Prisma.UserUncheckedCreateInput = {
    name: faker.person.fullName(),
    role,
    password: faker.internet.password({ length: 8 }),
    email: faker.internet.email().toLowerCase(),
  };

  return { ...randomUser, ...overrides };
}
const emailFormat = (role: Role, i = 0) =>
  i === 0
    ? `${role.toLowerCase()}@no.com`
    : `${role.toLowerCase()}+${i}@no.com`;

export function createRandomStudent() {
  return makeRandomUser("STUDENT");
}

export function createAdminUser(i = 0) {
  return makeRandomUser("ADMIN", { email: emailFormat("ADMIN", i) });
}

export function createCoachUser(i = 0) {
  return makeRandomUser("COACH", { email: emailFormat("COACH", i) });
}
