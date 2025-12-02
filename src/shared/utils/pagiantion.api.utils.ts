import { PaginationMeta } from "../middlewares/response.middleware";

export type ToCalcPaginationParamsType = {
  page: number;
  limit: number;
  totalRecords: number;
};

export const CalculatePaginationMeta = ({
  page,
  limit,
  totalRecords,
}: ToCalcPaginationParamsType): PaginationMeta => {
  const totalPages = Math.ceil(totalRecords / limit);
  return { page, limit, totalRecords, totalPages };
};
