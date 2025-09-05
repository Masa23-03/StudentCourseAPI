
export interface Course{
  id: string;
  title: string;
  description: string;
  image?: string; 
  createdAt: Date;
  updatedAt: Date;
  creatorId:string;
}