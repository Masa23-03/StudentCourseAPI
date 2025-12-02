export interface Course {
  id: string;
  title: string;
  description: string;
  image: string | null; // MongoDB doesn't store undefined, so use null to keep the field explicitly empty
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
}
