import z,{ZodType} from 'zod'
import { User } from '../user.entity'

export const userSchema=z.object({
    id:z.string(),
    name:z.string().min(1),

    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["ADMIN" , "COACH" , "STUDENT"]),

    createdAt: z.date(),
    updatedAt: z.date()

})satisfies ZodType<User>;



