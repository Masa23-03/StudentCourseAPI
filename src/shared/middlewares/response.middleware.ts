import {
  calculatePaginationMeta,
  ToCalcPaginationParamsType,
} from "../utils/pagination.api.utils";
import { ApiStatusCode } from "../utils/types.utils";
import { Response, Request, NextFunction } from "express";

export type PaginationMeta = {
  page: number;
  limit: number;

  totalRecords: number;

  totalPages: number;
};
type CommonMeta = {
  requestId?: string;
  timestamp?: string;
};
export type MetaApiResponse = CommonMeta & PaginationMeta;

export type UnifiedErrorApiResponse = {
  statusCode: ApiStatusCode;
  message: string;
};

export type SuccessfulApiResponse = {
  success: true;
  data: object;
  meta?: MetaApiResponse;
};

export type UnSuccessfulApiResponse = {
  success: false;
  error: UnifiedErrorApiResponse;
};
export type UnifiedApiResponse =
  | SuccessfulApiResponse
  | UnSuccessfulApiResponse;

const formatApiResponse = (res: UnifiedApiResponse) => res;

export const ResponseEnhancer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.ok = (data) =>
    res.status(200).json(formatApiResponse({ success: true, data }));
  res.create = (data) =>
    res.status(201).json(formatApiResponse({ success: true, data }));
  res.paginationResponse = (data: object, meta: ToCalcPaginationParamsType) =>
    res.status(200).json(
      formatApiResponse({
        success: true,
        data,
        meta: calculatePaginationMeta(meta),
      })
    );

  res.error = (err) =>
    res
      .status(err.statusCode)
      .json(formatApiResponse({ success: false, error: err }));

  next();
};
