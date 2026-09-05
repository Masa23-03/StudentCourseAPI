import mongoose from "mongoose";
import { Course } from "./course.entity";
import { toJSONOutputTransform } from "../../shared/mongoose.service";
import { UserRepository } from "../users/user.repository";
import { userRepo, userService } from "../users/user.index";

const courseSchema = new mongoose.Schema<Course>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: null, required: false },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: async function (v: string) {
          const user = await userRepo.findById(v);
          return !!user;
        },
        message: "Creator not found",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: toJSONOutputTransform,
  }
);

export const CourseModel = mongoose.model<Course>("Course", courseSchema);
