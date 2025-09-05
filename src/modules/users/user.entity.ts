
export type Role="ADMIN" | "COACH" | "STUDENT"
export interface User{
        id: string;
        name: string;
        email: string;
        password: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
}