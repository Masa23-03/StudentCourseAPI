//getEnvsOrThrow function

import { MyEnvs } from "./declarationMerging.utils";


export const getEnvsOrThrow=<K extends keyof MyEnvs>(envName:K): MyEnvs[K]=>{
const value=process.env[envName];
if(!value)throw new Error(envName + ' is missing! ');
return value;

}