type MyEnvs={
PORT:number,
JWT_SECRET:string,
MAX_IMAGE_SIZE_MB:number,
NODE_ENV:"development"|"staging"|"production",
}

declare global{ 
    namespace NodeJS{
    interface ProcessEnv extends MyEnvs{}
}
}

declare global{
    namespace Express{
        interface Response{
            create:(data:object)=>this;
            ok:(data:object)=>this;
            error:(error:unknown)=>this;

        }

        interface Request{
            
        }
    }
}