//? multer.config.ts

import multer from 'multer'
import path from 'path'
import { getEnvsOrThrow } from '../utils/envs.utils';


const destDirectory=path.join(__dirname , 'uploads');
const maxSizeInBytes=Number(getEnvsOrThrow('MAX_IMAGE_SIZE_MB'))*1024*1024

export const multerUpload=multer(
   {
    storage:multer.diskStorage({
        destination:(req , file , cb)=>{
            cb(null , destDirectory);
        },
        filename: (req,file , cb)=>{
            const fileName=`${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`;
            cb(null , fileName);

        }
    }),
    limits:{
        fileSize:maxSizeInBytes

    },
    fileFilter:(req , file , cb)=>{
        if(file.mimetype.startsWith('image/')){
            cb(null , true);
        }
        cb(new Error('this file type is not supported'));
    }
   
  






}
);



export const uploadSingle=(fieldName:string)=>multerUpload.single(fieldName);
export const uploadMultiple=(fieldName:string , maxCount:number)=>multerUpload.array(fieldName , maxCount);
