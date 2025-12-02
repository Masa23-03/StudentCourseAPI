//? declaration merging.ts
import { UnifiedErrorApiResponse } from "../middlewares/response.middleware";
import { User } from "../../modules/users/user.entity";
import { ToCalcPaginationParamsType } from "./pagiantion.api.utils";

export type MyEnvs = {
  PORT: number;
  JWT_SECRET: string;
  MAX_IMAGE_SIZE_MB: number;
  NODE_ENV: "development" | "staging" | "production" | "test";
  MONGODB_URL: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyEnvs {}
  }
}

declare global {
  namespace Express {
    interface Response {
      create: (data: object) => this;
      ok: (data: object) => this;
      paginationResponse: (
        data: object,
        meta: ToCalcPaginationParamsType
      ) => this;
      error: (error: UnifiedErrorApiResponse) => this;
    }

    interface Request {
      user?: Pick<User, "id" | "name" | "role">;
    }
  }
}
