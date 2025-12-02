import { Model } from "mongoose";
import { GenericRepositoryI } from "./genericRepo.Interface";
import { CreatePayload, UpdatePayload } from "./utils/types.utils";

export class MongooseRepository<T> implements GenericRepositoryI<T> {
  // findAll, findById, create, update, delete
  constructor(protected readonly model: Model<T>) {}

  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{ records: T[]; totalRecords: number }> {
    const docs = await this.model
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    // run toJSON() so your schema transform (remove _id, __v, password, etc.) is applied
    const records = docs.map((doc: any) =>
      doc && typeof doc.toJSON === "function" ? doc.toJSON() : doc
    ) as T[];

    const totalRecords = await this.model.countDocuments().exec();

    return { records, totalRecords };
  }

  async findById(id: string): Promise<T | null> {
    const doc = await this.model.findById(id).exec();
    if (!doc) return null;

    const json = (doc as any).toJSON ? (doc as any).toJSON() : doc;
    return json as T;
  }

  async create(payload: CreatePayload<T>): Promise<T> {
    const record = await this.model.create(payload as any);
    const json = (record as any).toJSON ? (record as any).toJSON() : record;
    return json as T;
  }

  async update(id: string, payLoad: UpdatePayload<T>): Promise<T | null> {
    const doc = await this.model
      .findByIdAndUpdate(id, payLoad as any, {
        new: true,
      })
      .exec();

    if (!doc) return null;

    const json = (doc as any).toJSON ? (doc as any).toJSON() : doc;
    return json as T;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return Boolean(result);
  }
}
