import "dotenv/config";
import { createCoachUser, createRandomStudent } from "./user.seed";
import { faker } from "@faker-js/faker";
import { UserModel } from "../../modules/users/user.model";
import { mongooseService } from "../mongoose.service";

const seedDataInMongoose = async () => {
  await mongooseService.connect();
  await UserModel.deleteMany({});
  console.log(" users is empty");

  const coachSeed = createCoachUser();

  const studentSeeds = faker.helpers.multiple(createRandomStudent, {
    count: 5,
  });

  await UserModel.create([coachSeed, ...studentSeeds]);
  console.log("seeding users is done");
  process.exit(0);
};

seedDataInMongoose().catch((err) => {
  console.error("❌ seeding error " + err);
  process.exit(1);
});
