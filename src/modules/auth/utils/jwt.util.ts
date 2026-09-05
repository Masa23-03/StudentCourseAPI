import jwt, { Jwt, SignOptions } from "jsonwebtoken";
import { getEnvsOrThrow } from "../../../shared/utils/envs.utils";

const JwtSecret = getEnvsOrThrow("JWT_SECRET");
type JwtPayload = { sub: string; name: string; role: string };

export const signJwt = (payLoad: JwtPayload, options?: SignOptions) => {
  return jwt.sign(payLoad, JwtSecret, options);
};

export const verifyJwt = (token: string): JwtPayload => {
  return jwt.verify(token, JwtSecret) as JwtPayload;
};
