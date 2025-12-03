import supertest from "supertest";
import { usersData } from "../../../modules/users/user.data";
import { app } from "../../../server";

const user1 = usersData[0]!;
const token = singJWT({ name: user1.name, sub: user1.id });

export const unAuthedTestAgent = supertest.agent(app);

export const authedTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${token}`);

function singJWT(arg0: { name: string; sub: string | undefined }) {
  throw new Error("Function not implemented.");
}
