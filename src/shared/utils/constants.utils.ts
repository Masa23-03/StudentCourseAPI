//modules name as const
export const MODULES_NAMES = {
  auth: "AUTH",
  user: "USER",
  course: "COURSE",
} as const;

export type ModuleNameType = (typeof MODULES_NAMES)[keyof typeof MODULES_NAMES];

export const COURSE_ENDPOINT = "/api/v1/courses" as const;
export const USER_ENDPOINT = "/api/v1/users" as const;
