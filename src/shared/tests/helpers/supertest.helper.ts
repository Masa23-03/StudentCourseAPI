import supertest from "supertest";
import { usersData } from "../../../modules/users/user.data";
import { app } from "../../../server";
import { Role } from "../../utils/types.utils";
import { signJwt } from "../../../modules/auth/utils/jwt.util";

export const unAuthedTestAgent = supertest.agent(app);

export function makeAuthedTestAgent(user: {
  id: string;
  name: string;
  role: Role;
}) {
  const token = signJwt({
    sub: user.id,
    name: user.name,
    role: user.role,
  });

  return supertest.agent(app).set("Authorization", `Bearer ${token}`);
}
