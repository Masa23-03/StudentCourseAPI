import express, {   Response , Request , NextFunction } from "express";
import { getEnvsOrThrow } from "./shared/utils/envs.utils";
import { ResponseEnhancer } from "./shared/middlewares/response.middleware";
import path from "path";
import fs from 'fs'
import { HandleError } from "./shared/utils/error.utils";

const app =express();
const Port=getEnvsOrThrow('PORT');

app.use(express.json);
app.use(express.urlencoded);
app.use(ResponseEnhancer);

app.use(express.static(path.join(__dirname , 'public') , {
    setHeaders:(res , path)=>{
        res.setHeader('Cache-Control'  , `public, max-age=${5}`)//5 seconds 
    }
}));

app.use('/uploads' , express.static(path.join(__dirname , 'uploads')));

//! routes 
//auth
//user
//course

//handle 404
const notFoundPath=path.join(__dirname , 'public' , '404.html');
const notFoundPageHtml=fs.readFileSync(notFoundPath  , 'utf-8');

app.use((req:Request , res:Response  ) =>{ 
    if(req.path.startsWith('/api/ ')){
        return res.error({statusCode:404 , message:`Route ${req.method} ${req.path} not found`});

    }
    const dynamicHtml=notFoundPageHtml.replace(/{{requestedPath}}/g , req.path).replace(/{{method}}/g , new Date().toLocaleDateString());
    //TODO: edit the message
    res.error({statusCode:404 , message:'dynamic not found'})
});

app.use( (err:Error , req:Request , res:Response , next:NextFunction) =>{
    HandleError(err , res);


});


app.listen(Port);

