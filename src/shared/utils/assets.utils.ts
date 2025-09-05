import {promises as fs }from 'fs'
import path from 'path'
//deleteUploadedAsset 
export const deleteUploadedAsset  = async (fileName:string)=>{

    const pathToDelete=path.join(__dirname , '../','uploads' ,fileName );
    await  fs.unlink(pathToDelete);
   
}