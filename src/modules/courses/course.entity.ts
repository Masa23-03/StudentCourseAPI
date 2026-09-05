
export interface Course{
  id: string;
  title: string;
  description: string;
  image?: string|undefined; 
  createdAt: Date;
  updatedAt: Date;
  creatorId:string;
}