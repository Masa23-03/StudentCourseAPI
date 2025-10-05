import { faker } from "@faker-js/faker";
import { Role, PrismaClient } from "../../src/generated/prisma";
import { createArgonHash } from "../../src/modules/auth/utils/argon.util";
import { createRandomCourse } from "../../src/shared/seeds/course.seed";
import { makeRandomUser } from "../../src/shared/seeds/user.seed";

const prisma = new PrismaClient();
async function main() {
  console.log("🌱 Seeding...");
  await prisma.course.deleteMany({});
  await prisma.user.deleteMany({});

  const coachData = {
    ...makeRandomUser("COACH", {
      email: "coach12@no.com",
      password: await createArgonHash("coach123"),
    }),
    createdCourses: {
      createMany: {
        data: faker.helpers.multiple(() => createRandomCourse(), { count: 5 }),
      },
    },
  };

  await prisma.user.create({
    data: coachData,
  });

  console.log("Seeded 1 coach with 5 random courses!");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
