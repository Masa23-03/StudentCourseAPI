import { faker } from "@faker-js/faker";
import { User } from "../../modules/users/user.entity";
import { Role } from "../utils/types.utils";

function makeRandomUser(role:User['role'] , overrides: Partial<User>={}):User{
    const randomUser:User={
        id:faker.string.uuid(),
        name:faker.person.fullName(),
        role:role,
        password:faker.internet.password({length:8}),
        email:faker.internet.email().toLowerCase(),
        createdAt:faker.date.past(),
        updatedAt:faker.date.future(),

    };

    return {...randomUser , ...overrides};

}
const emailFormat=(role:Role , i=0)=>
 i===0? `${role.toLowerCase()}@no.com` : `${role.toLowerCase()}+${i}@no.com`


export function createRandomStudent():User{
return makeRandomUser('STUDENT');


}

export function createAdminUser(i=0):User{
return makeRandomUser('ADMIN' , {email:emailFormat('ADMIN' , i)});

}

export function createCoachUser(i=0):User{
    return makeRandomUser('COACH' , {email:emailFormat('COACH' , i)});
    
}