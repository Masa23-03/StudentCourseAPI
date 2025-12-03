import mongoose from "mongoose";
import { createCoachUser, createRandomStudent } from "./user.seed";
import { faker } from "@faker-js/faker";
import { UserModel } from "../../modules/users/user.model";
import { getEnvsOrThrow } from "../utils/envs.utils";
import { mongooseService } from "../mongoose.service";

const seedDataInMongoose = async () => {
  await mongooseService.connect();

  const studentSeeds = faker.helpers.multiple(createRandomStudent, {
    count: 5,
  });
  const coachSeeds = faker.helpers.multiple(() => createCoachUser(), {
    count: 5,
  });
  await UserModel.create(coachSeeds);
  console.log("seeding users is done");
  process.exit(0);
};

seedDataInMongoose().catch((err) => {
  console.error("❌ seeding error " + err);
  process.exit(1);
});
