import { z, ZodType } from "zod";
import { Course } from '../course.entity'
import { createOrUpdateCourse } from '../types/dto.types'


export const courseSchema=z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  image: z.string().optional(), 
  createdAt: z.date(),
  updatedAt: z.date(),
  creatorId: z.string()
})satisfies ZodType<Course>


export const createOrUpdateCourseSchema=courseSchema.pick({
title:true , 
description:true, 
image:true

})satisfies ZodType<createOrUpdateCourse>;



export const updateCourseSchema=createOrUpdateCourseSchema.partial()
                                .refine(obj => Object.keys(obj).length >0,{message:'at least one key must be provided'})