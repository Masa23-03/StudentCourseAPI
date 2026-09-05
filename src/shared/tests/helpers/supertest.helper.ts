import supertest from "supertest";
import { app } from "../../../server";
import { Role } from "../../utils/types.utils";
import { signJwt } from "../../../modules/auth/utils/jwt.util";

type Agent = ReturnType<typeof supertest.agent>;

export const unAuthedTestAgent: Agent = supertest.agent(app);

export function makeAuthedTestAgent(user: {
  id: string;
  name: string;
  role: Role;
}): Agent {
  const token = signJwt({
    sub: user.id,
    name: user.name,
    role: user.role,
  });

  return supertest.agent(app).set("Authorization", `Bearer ${token}`);
}
