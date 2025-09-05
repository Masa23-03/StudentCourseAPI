import z , {ZodType} from 'zod'

import { Course } from '../course.entity'

export const courseSchema=z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  image: z.string().optional(), 
  createdAt: z.date(),
  updatedAt: z.date(),
  creatorId: z.string()
})satisfies ZodType<Course>