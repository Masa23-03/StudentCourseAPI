import { CreatePayload, UpdatePayload } from "./utils/types.utils";

export interface GenericRepositoryI<T> {
  findAll(
    page: number,
    limit: number
  ): Promise<{ records: T[]; totalRecords: number }>;

  findById(id: string): Promise<T | null>;

  create(payload: CreatePayload<T>): Promise<T>;

  update(id: string, payLoad: UpdatePayload<T>): Promise<T | null>;

  delete(id: string): Promise<boolean>;
}
