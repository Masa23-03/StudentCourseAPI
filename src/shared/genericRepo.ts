export function Repository(model: {
  findMany: (args?: any) => Promise<any>;
  findUniqueOrThrow: (args: any) => Promise<any>;
  create: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
}) {
  return {
    findAll(args?: Parameters<typeof model.findMany>[0]) {
      return model.findMany(args as any);
    },

    findById(where: Parameters<typeof model.findUniqueOrThrow>[0]["where"]) {
      return model.findUniqueOrThrow({ where } as any);
    },

    create(data: Parameters<typeof model.create>[0]["data"]) {
      return model.create({ data } as any);
    },

    update(
      where: Parameters<typeof model.update>[0]["where"],
      data: Parameters<typeof model.update>[0]["data"]
    ) {
      return model.update({ where, data } as any);
    },
    delete(where: Parameters<typeof model.delete>[0]["where"]) {
      return model.delete({ where } as any);
    },
  };
}
