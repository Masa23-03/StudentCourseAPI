export type StringObject=Record<string,unknown>;


//ApiStatusCode 
export const HttpErrorStatus = {
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,



}as const;

export type HttpErrorStatusType=typeof HttpErrorStatus;

export type ErrorStatusCode=HttpErrorStatusType[ keyof HttpErrorStatusType];

export type ApiStatusCode=|ErrorStatusCode|200|201|202|204