import z, { ZodType } from "zod";
import { userSchema } from "../../users/utils/schema.util";
import { registerDTO , loginDTO } from "../types/dto.types";

export const registerDTOSchema=userSchema.pick({
    email:true,
    name:true,
    password:true,
    


})satisfies ZodType<registerDTO>;

export const loginDTOSchema = userSchema.pick({
    email: true,
    password: true
}) satisfies ZodType<loginDTO>;