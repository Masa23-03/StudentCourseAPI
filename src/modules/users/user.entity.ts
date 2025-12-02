import { Role } from "../../shared/utils/types.utils";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};
