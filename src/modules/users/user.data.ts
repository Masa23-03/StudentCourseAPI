import { faker } from "@faker-js/faker";
import { createAdminUser, createCoachUser, createRandomStudent } from "../../shared/seeds/user.seed";
import { User } from "./user.entity";

export const usersData:User[]=[
    createAdminUser(0),
    ...faker.helpers.multiple(() => createRandomStudent() , {count:5}),


]