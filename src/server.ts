import 'dotenv/config';
import express, {   Response , Request , NextFunction } from "express";
import { getEnvsOrThrow } from "./shared/utils/envs.utils";
import { ResponseEnhancer } from "./shared/middlewares/response.middleware";
import path from "path";
import fs from 'fs'
import { HandleError } from "./shared/utils/error.utils";
import { userService } from "./modules/users/user.service";
import { userRouter } from "./modules/users/user.routes";
import { courseRouter } from "./modules/courses/course.routes";
import { authRouter } from "./modules/auth/auth.routes";


const app =express();
const Port=getEnvsOrThrow('PORT');

app.use(express.json());
app.use(express.urlencoded());
app.use(ResponseEnhancer);

app.use(express.static(path.join(__dirname , 'public') , {
    setHeaders:(res , path)=>{
        res.setHeader('Cache-Control'  , `public, max-age=${5}`)//5 seconds 
    }
}));

app.use('/uploads' , express.static(path.join(__dirname , 'uploads')));

userService.adminUserSeed();
//! routes 

//user
app.use("/api/v1/users", userRouter);
//course
app.use('/api/v1/courses', courseRouter);
//auth
app.use('/api/v1/auth' , authRouter);
//handle 404
const notFoundPath=path.join(__dirname , '../' , 'public' , '404.html');
const notFoundPageHtml=fs.readFileSync(notFoundPath  , 'utf-8');

app.use((req:Request , res:Response  ) =>{ 
    if(req.path.startsWith('/api/')){
        return res.error({statusCode:404 , message:`Route ${req.method} ${req.path} not found`});

    }
    const dynamicHtml=notFoundPageHtml.replace(/{{requestedPath}}/g , req.path).replace(/{{method}}/g , 
    new Date().toLocaleDateString());
   
    res.error({statusCode:404 , message:dynamicHtml.toString()})
});

app.use( (err:unknown , req:Request , res:Response , next:NextFunction) =>{
    HandleError(err , res);


});


app.listen(Port , ()=>{
  console.log('App is running in port: ', Port);    
});

