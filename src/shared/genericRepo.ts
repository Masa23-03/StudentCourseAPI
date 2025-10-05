export class Repository<
  T,
  D extends {
    findMany: (args?: any) => Promise<T[]>;
    findUniqueOrThrow: (args: any) => Promise<T>;
    create: (args: any) => Promise<T>;
    update: (args: any) => Promise<T>;
    delete: (args: any) => Promise<T>;
  }
> {
  constructor(protected readonly model: D) {}

  findAll(args?: Parameters<D["findMany"]>[0]) {
    return this.model.findMany(args as any);
  }

  findById(where: Parameters<D["findUniqueOrThrow"]>[0]["where"]) {
    return this.model.findUniqueOrThrow({
      where,
    });
  }

  create(data: Parameters<D["create"]>[0]["data"]) {
    return this.model.create({ data });
  }
  update(
    where: Parameters<D["update"]>[0]["where"],
    data: Parameters<D["update"]>[0]["data"]
  ) {
    return this.model.update({ where, data });
  }
  delete(where: Parameters<D["delete"]>[0]["where"]) {
    return this.model.delete({ where });
  }
}
