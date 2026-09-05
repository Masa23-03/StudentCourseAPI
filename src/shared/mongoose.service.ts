import mongoose, { Document, FlatRecord } from "mongoose";
import { getEnvsOrThrow } from "./utils/envs.utils";
import { removeFields } from "./utils/object.utils";

//connect
export const mongooseService = {
  connect: async () => {
    await mongoose.connect(getEnvsOrThrow("MONGODB_URL"));
    console.log("✔️ mongoose connected successfully");
  },
};

//method to remove __v and _id
export const toJSONOutputTransform = {
  virtuals: true,
  transform: (doc: Document, ret: FlatRecord<Record<string, unknown>>) => {
    return removeFields(ret, ["_id", "__v", "password"]);
  },
};
