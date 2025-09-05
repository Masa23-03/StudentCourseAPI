import z, { ZodType } from "zod";
import { userSchema } from "../../users/utils/schema.util";
import { registerDTO , loginDTO } from "../types/dto.types";

export const registerDTOSchema=userSchema.pick({
    email:true,
    name:true,
    password:true,
    


})satisfies ZodType<registerDTO>;