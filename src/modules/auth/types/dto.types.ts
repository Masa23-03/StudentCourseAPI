import { User } from "../../users/user.entity";

export type registerDTO = Pick<User, "email" | "name" | "password">;
export type registerResponseDTO = Omit<User, "password">;
export type loginDTO = Pick<User, "email" | "password">;
export type loginResponseDTO = Omit<User, "password">;

export type loginResponseDTOWithJWT = {
  data: Omit<User, "password">;
  token: string;
};
