
import { COURSE_ENDPOINT } from "../../../shared/utils/constants.utils";
import { makeTokenForSeededUser } from "../../../shared/tests/helpers/auth.factory"
import { authedRequest, unAuthedRequest } from "../../../shared/tests/helpers/authJwt.helper"
import { Course } from "../course.entity";
import { faker } from "@faker-js/faker/.";
import { COURSE_DATASET } from "../../../shared/data/course.dataset";
import { courseService } from "../course.index";
import { extractFields } from "../../../shared/utils/object.utils";
import { createRandomCourse } from "../../../shared/seeds/course.seed";
import { coursesData } from "../course.data";

//POST /courses → Create a new course (only COACH or ADMIN)
describe('POST /api/v1/courses' , ()=>{
 
it('POST /api/v1/courses Missing required fields returns 400.' , async ()=>{
    //  - ❌ Validation Error: Missing required fields returns 400.
    const token=makeTokenForSeededUser('ADMIN');
    const res=await authedRequest(token).post(COURSE_ENDPOINT).send({description:'only description'});
    expect(res.statusCode).toBe(400);
    console.log(res.body);
})
it('POST /api/v1/courses STUDENT cannot create a course.' , async ()=>{
//   - ❌ Forbidden: STUDENT cannot create a course.
const token=makeTokenForSeededUser('STUDENT');
const courseElement=faker.helpers.arrayElement(COURSE_DATASET);

const course:Partial<Course>={

   description:courseElement.description,
   title:courseElement.name

}
const res=await authedRequest(token).post(COURSE_ENDPOINT).send(course);
expect(res.statusCode).toBe(403);


expect(res.body).toEqual({
   success:false ,
   error:expect.objectContaining({
      statusCode:403,
      message:expect.any(String)
   }) 
})
})
it('POST /api/v1/courses COACH or ADMIN can create a course with valid data.' , async ()=>{
   const token=makeTokenForSeededUser('ADMIN');
   const course=extractFields(createRandomCourse(), ['description','title']);
   
   const res=await authedRequest(token).post(COURSE_ENDPOINT).send(course);
   expect(res.statusCode).toBe(201);
   expect(res.body).toEqual({
      success:true , 
      data: expect.objectContaining({
         title:course.title,
         description:course.description
      })
   
   });
   const course_Service=courseService;
   const createdCourse=course_Service.getCourse(res.body.data.id)!;
   expect(createdCourse).toBeDefined();
   expect(Object.keys(createdCourse).length).toBeGreaterThanOrEqual(5)


   console.log(res.body);

})
})

describe('PUT /api/v1/courses' , ()=>{
   /*
   4. PUT /courses/:id
   - ✅ Success: Course creator (COACH/ADMIN) updates a course successfully.
   - ❌ Forbidden: STUDENT cannot update courses.
   - ❌ Not Owner: COACH cannot update a course created by another COACH.
    */
   const coach1Token=makeTokenForSeededUser('COACH' , 2);
   const coach2Token=makeTokenForSeededUser('COACH' , 1);
   const studentToken=makeTokenForSeededUser('STUDENT');

   let createdCourseId:string;

   const randomCourseData=faker.helpers.arrayElement(COURSE_DATASET);
   const updatedCourse={
         title: randomCourseData.name,
         description:randomCourseData.description
      }


   beforeAll( async () =>{
      
      
      const courseFromDataSet=faker.helpers.arrayElement(COURSE_DATASET);
      const courseBody ={
         title: courseFromDataSet.name,
         description:courseFromDataSet.description,

      }
       console.log(studentToken , '    student token');
        console.log(coach1Token , '    coach 1 token');
         console.log(coach2Token , '    coach 2 token');
      const {body:created }=await authedRequest(coach1Token).post(COURSE_ENDPOINT).send(courseBody).expect(201);
      createdCourseId = created.data?.id ?? created.id; 
      console.log('created by', created.data?.creatorId);
      console.log(created , '    created Course');


   })
   it('Course creator (COACH/ADMIN) updates a course successfully.' , async ()=>{
   
      const res=await authedRequest(coach1Token).put(`${COURSE_ENDPOINT}/${createdCourseId}`).send(updatedCourse);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
         success:true , 
         data:expect.objectContaining(
            updatedCourse
            
         )
      });
      expect(res.body.data.id).toBe(createdCourseId);
      expect(res.body.data.title).toBe(updatedCourse.title);
      console.log(res.body , '   updated Course');

   })
   it(' STUDENT cannot update courses.' , async ()=>{
      const res=await authedRequest(studentToken).put(`${COURSE_ENDPOINT}/${createdCourseId}`).send(updatedCourse);
      expect(res.statusCode).toBe(403);
      expect(res.body).toEqual({
         success:false,
         error:expect.objectContaining({
            message:'Forbidden'
         })
      })
      console.log(res.body , 'failed updating res');

   })
   it(' COACH cannot update a course created by another COACH.' , async ()=> {
       const res=await authedRequest(coach2Token).put(`${COURSE_ENDPOINT}/${createdCourseId}`).send(updatedCourse);
       expect(res.statusCode).toBe(401);
       expect(res.body).toEqual({
         success:false,
         error:expect.objectContaining({
            message:'Unauthorized'
         })
       })
       console.log(res.body , 'Failed: COACH cannot update a course created by another COACH.');
   }
     
   )
})

describe(`GET /courses/:id → Get course by ID (public)` , ()=>{
/*
3. GET /courses/:id
   - ✅ Success: Returns course details when ID is valid.
   - ❌ Not Found: Returns 404 for invalid course ID.
 */

   it('Returns course details when ID is valid.' , async ()=>{
      const randomCourse=faker.helpers.arrayElement(coursesData);
      const courseId=randomCourse.id;
      console.log(courseId , ' :ID')
      const res=await unAuthedRequest.get(`${COURSE_ENDPOINT}/${courseId}`);
      expect(res.statusCode).toBe(200);
      expect(Object.keys(res.body.data).length).toBe(5);
      console.log(res.body.data , ' course');
     
   })

   it('Returns 404 for invalid course ID.' , async ()=>{
      const invalidId=faker.string.uuid();
      console.log(invalidId , ' :ID');
      const res=await unAuthedRequest.get(`${COURSE_ENDPOINT}/${invalidId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
         success:false , 
         error:expect.objectContaining({
            message:'Not Found'
         })
      })
   })
})


/*
 Test Scenarios for Course Module

1. POST /courses
   - ✅ Success: COACH or ADMIN can create a course with valid data.
   - ❌ Forbidden: STUDENT cannot create a course.
   - ❌ Validation Error: Missing required fields returns 400.

2. GET /courses
   - ✅ Success: Returns a list of all courses (public).
   - ❌ Edge: Returns an empty array when no courses exist.

3. GET /courses/:id
   - ✅ Success: Returns course details when ID is valid.
   - ❌ Not Found: Returns 404 for invalid course ID.

4. PUT /courses/:id
   - ✅ Success: Course creator (COACH/ADMIN) updates a course successfully.
   - ❌ Forbidden: STUDENT cannot update courses.
   - ❌ Not Owner: COACH cannot update a course created by another COACH.

5. DELETE /courses/:id
   - ✅ Success: Course creator (COACH/ADMIN) deletes a course successfully.
   - ❌ Forbidden: STUDENT cannot delete courses.
   - ❌ Not Owner: COACH cannot delete a course created by another COACH.
   
   
*/