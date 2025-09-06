import { Role } from "../../shared/utils/types.utils";

export interface User{
        id: string;
        name: string;
        email: string;
        password: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
}