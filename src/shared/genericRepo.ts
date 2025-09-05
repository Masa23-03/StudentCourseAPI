
type Required={
    id: string;
    createdAt: Date;
    updatedAt: Date
   

}

export class Repository<T extends Required>{
//findAll, findById, create, update, delete

private arr:T[]=[];
private idCounter=1;



public  findAll(): T[]{
return this.arr;
}

public findById(id:string): T|undefined{
return this.arr.find( (ele) => ele.id===id);

}

public create(payload: Omit<T, "id" | "createdAt" | "updatedAt">):T{
    const element:T={
         ...(payload as object),
        id:this.idCounter.toString(),
        createdAt:new Date(),
        updatedAt: new Date(),
       

    }as T;

    this.idCounter++;
    this.arr.push(element);
   
    return element;


}

public update(id:string , value:Omit<Partial<T> , "id"|"createdAt" | "updatedAt">): T|null{
const element=this.findById(id);
if(!element) return null;
Object.assign(element , value);
element.updatedAt=new Date();

return element;


}
public delete(id:string):boolean{
const index=this.arr.findIndex((ele) => ele.id===id);
if(index===-1)return false;
this.arr.splice(index , 1);
return true;

}
}