import {faker} from '@faker-js/faker'
import { Course } from '../../modules/courses/course.entity'
import { COURSE_DATASET } from '../data/course.dataset'
import { usersData } from '../../modules/users/user.data';
import { CustomError } from '../utils/error.utils';
import { HttpErrorStatus } from '../utils/types.utils';


function getAdminId():string{
    const admin=usersData.find( (user) => user.role === 'ADMIN');
    if(!admin)throw new CustomError('No ADMIN user seeded yet' , 'COURSE' , HttpErrorStatus.NotFound);
    return admin.id;

}

export const createRandomCourse= ():Course=> {
    
  const courseElement=faker.helpers.arrayElement(COURSE_DATASET);
  
  const randomCourse:Course={
    id:faker.string.uuid(),
    title:courseElement.name,
    description:courseElement.description,
    createdAt:faker.date.past(),
    updatedAt:faker.date.future(),
    creatorId:getAdminId()

}
return randomCourse;

}