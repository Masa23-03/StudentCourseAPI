import { CustomError } from './error.utils';

//zodValidation 
import zod, { ZodError, ZodType } from 'zod'
import { ModuleNameType } from './constants.utils'
import { HttpErrorStatus } from './types.utils';

export const zodValidation=<T>(schema:ZodType<T>, payLoad: T , moduleName:ModuleNameType)=>{
try {
    const data=schema.parse(payLoad);
    return data;


} catch (error) {
    if(error instanceof ZodError){
       throw new CustomError(error.message , moduleName , HttpErrorStatus.BadRequest);
       
    }
    throw error;

}
}