import mongoose from "mongoose";
import { User } from "./user.entity";
import { toJSONOutputTransform } from "../../shared/mongoose.service";
import { RoleConst } from "../../shared/utils/types.utils";

const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, enum: Object.values(RoleConst), required: true },
    password: {
      type: String,
      required: true,
      validate: {
        validator: async function (v: string) {
          return v.length >= 6;
        },
        message: "Password must be at least 6 characters long",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: toJSONOutputTransform,
  }
);

export const UserModel = mongoose.model<User>("User", userSchema);
