import { Model } from "mongoose";
import { GenericRepositoryI } from "./genericRepo.Interface";
import { CreatePayload, UpdatePayload } from "./utils/types.utils";

export class MongooseRepository<T> implements GenericRepositoryI<T> {
  //findAll, findById, create, update, delete
  constructor(protected readonly model: Model<T>) {}
  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{ records: T[]; totalRecords: number }> {
    const records = (await this.model
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec()) as T[];
    const totalRecords = await this.model.countDocuments().exec();
    return { records: records, totalRecords };
  }
  async findById(id: string): Promise<T | null> {
    const doc = await this.model.findById(id).exec();
    return doc as T | null;
  }
  async create(payload: CreatePayload<T>): Promise<T> {
    const record = await this.model.create(payload as any);
    const toJson = (record as any).toJSON ? (record as any).toJSON() : record;
    return toJson;
  }
  async update(id: string, payLoad: UpdatePayload<T>): Promise<T | null> {
    const record = await this.model
      .findByIdAndUpdate(id, payLoad as any, {
        new: true,
      })
      .exec();
    return record as T | null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return Boolean(result);
  }
}
