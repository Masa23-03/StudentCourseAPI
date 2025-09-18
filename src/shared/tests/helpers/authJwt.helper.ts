import { app } from "../../../server";
import request , {Test} from 'supertest';

export const setBearer= (req:Test , token:string)=>
    req.set('Authorization' , `Bearer ${token}`);

export const authedRequest=(token:string)=> ({
get:(url:string)=>setBearer(request(app).get(url), token),
post:(url:string)=>setBearer(request(app).post(url) , token),
put:(url:string)=>setBearer(request(app).put(url) , token),
del:(url:string)=>setBearer(request(app).del(url) , token)

});

export const unAuthedRequest={
get:(url:string)=>request(app).get(url),
post:(url:string)=>request(app).post(url),
put:(url:string)=>request(app).put(url),
del:(url:string)=>request(app).del(url)
};
