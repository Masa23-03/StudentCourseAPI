export type StringObject=Record<string,unknown>;


//ApiStatusCode 
export const HttpErrorStatus = {
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  ServerError:500



}as const;

export type HttpErrorStatusType=typeof HttpErrorStatus;

export type ErrorStatusCode=HttpErrorStatusType[ keyof HttpErrorStatusType];

export type ApiStatusCode=|ErrorStatusCode|200|201|202|204

export const RoleConst={
admin:'ADMIN',
student:'STUDENT', 
coach:'COACH'
}as const;


export type RoleConstType=typeof RoleConst;
export type Role=RoleConstType[keyof RoleConstType];


