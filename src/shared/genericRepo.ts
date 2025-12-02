import { Model } from "mongoose";
import { GenericRepositoryI } from "./genericRepo.Interface";
import { MongodbModelsType } from "./utils/constants.utils";
import { CreatePayload, UpdatePayload } from "./utils/types.utils";

export class MongooseRepository<T> implements GenericRepositoryI<T> {
  //findAll, findById, create, update, delete
  constructor(protected readonly model: Model<T>) {}
  async findAll(
    page: number,
    limit: number
  ): Promise<{ records: T[]; totalRecords: number }> {
    const items = await this.model
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const totalRecords = await this.model.countDocuments().exec();
    return { records: items, totalRecords };
  }
  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }
  async create(payload: CreatePayload<T>): Promise<T> {
    return await this.model.create(payload);
  }
  async update(id: string, payLoad: UpdatePayload<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, payLoad, { new: true }).exec();
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return Boolean(result);
  }
}
