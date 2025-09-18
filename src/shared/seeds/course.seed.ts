import {faker} from '@faker-js/faker'
import { Course } from '../../modules/courses/course.entity'
import { COURSE_DATASET } from '../data/course.dataset'
import { usersData } from '../../modules/users/user.data';
import { CustomError } from '../utils/error.utils';
import { HttpErrorStatus } from '../utils/types.utils';
import { getSeededUserByRole } from '../tests/helpers/auth.factory';


export const createRandomCourse= (role: 'ADMIN' | 'COACH' = 'ADMIN'):Course=> {
    
  const courseElement=faker.helpers.arrayElement(COURSE_DATASET);
  
  const randomCourse:Course={
    id:faker.string.uuid(),
    title:courseElement.name,
    description:courseElement.description,
    createdAt:faker.date.past(),
    updatedAt:faker.date.future(),
    creatorId:getSeededUserByRole(role ).id

}
return randomCourse;

}