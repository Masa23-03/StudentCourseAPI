
type IdRequired={
    id:string;

}

export class Repository<T extends IdRequired>{
//findAll, findById, create, update, delete

private arr:T[]=[];



public  findAll(){
return this.arr;
}

public findById(id:string){
return this.arr.find( (ele) => ele.id===id);

}

public create(payLoad:T){
    this.arr.push(payLoad);
    return payLoad;


}

public update(value:T): T|null{
const element=this.findById(value.id);
if(!element) return null;

return element;


}
public delete(id:string):boolean{
const index=this.arr.findIndex((ele) => ele.id===id);
if(index===-1)return false;
this.arr.splice(index , 1);
return true;

}
}