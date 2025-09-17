import { v4 as uuid4  } from "uuid";
type Required={
  id: string;

   
   

}

export class Repository<T extends Required>{
//findAll, findById, create, update, delete

  private arr: T[] = [];



constructor(arr: T[] = []){
    this.arr=arr;

}
 public findAll(): T[] {
    return this.arr; 
  }

public findById(id:string): T|undefined{
return this.arr.find( (ele) => ele.id===id);

}

public create(payload: Omit<T, "id" >): T{

 const data = {
      ...(payload as object),
      id:uuid4(),
    
    } as T;

    this.arr.push(data);
   
   
    
   
    return data;


}

public update(id: string, payLoad: Omit<Partial<T>, "id" >): T | null {
const element=this.findById(id);
if(!element) return null;
Object.assign(element , payLoad);

return element;


}
public delete(id:string):boolean{
const index=this.arr.findIndex((ele) => ele.id===id);
if(index===-1)return false;
this.arr.splice(index , 1);
return true;

}
}