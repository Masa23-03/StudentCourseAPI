import { MongooseRepository } from "../../shared/genericRepo";
import { CreatePayload } from "../../shared/utils/types.utils";
import { userRepo } from "../users/user.index";
import { Course } from "./course.entity";
import { CourseModel } from "./course.model";

export class CourseRepository extends MongooseRepository<Course> {
  constructor() {
    super(CourseModel);
  }

  async findAllWithCreator(page: number = 1, limit: number = 10) {
    const docs = await this.model
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("creatorId")
      .exec();

    const records = docs.map((doc: any) =>
      doc && typeof doc.toJSON === "function" ? doc.toJSON() : doc
    ) as Course[];

    const totalRecords = await this.model.countDocuments().exec();

    return { records, totalRecords };
  }

  async findByIdWithCreator(id: string): Promise<Course | null> {
    const doc = await this.model.findById(id).populate("creatorId").exec();
    if (!doc) return null;
    const toJson = (doc as any).toJSON ? doc.toJSON() : doc;
    return toJson as Course;
  }

  async createCourse(payload: CreatePayload<Course>) {
    const doc = await this.model.create(payload as any);
    const populated = await (doc as any).populate("creatorId");
    const toJson = populated.toJSON ? populated.toJSON() : populated;
    return toJson as Course;
  }
}
