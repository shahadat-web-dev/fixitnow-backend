import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import config from "../../config/index.js";
import { RegisterUserPayload } from "./user.interface.js";


const registerUserIntoDB = async (payload: RegisterUserPayload) => {

  const { name, email, password, image, role } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email }
  });

  if (isUserExist) {
    throw new Error("User with this email already exists")
  }

  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  const CreatedUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image,
      role
    }
  });

  // if (CreatedUser.role === "TECHNICIAN") {
  //   await prisma.technicianProfile.create({
  //     data: {
  //       userId: CreatedUser.id,
  //       address: "",
  //       city: "",
  //     },
  //   });
  // };

  // console.log(CreatedUser.role)


if (CreatedUser.role === "TECHNICIAN") {
  const profile = await prisma.technicianProfile.create({
    data: {
      userId: CreatedUser.id,
      address: "",
      city: "",
    },
  });

  console.log("Profile Created:", profile);
}


  const user = await prisma.user.findUnique({
  where: {
    id: CreatedUser.id,
  },
  omit: {
    password: true,
  },
  include: {
    technicianProfile: true,
  },
});


  return user;
};


const getMyProfileFromDB = async (userId : string) => {
   const user = await prisma.user.findFirstOrThrow({
    where : {id : userId},
    omit : {
      password : true
    }
   });
   return user
 }

 const updateMyProfileInDB = async (userId : string, payload :any) => {
  const {name, email, profilePhoto, bio} = payload;

  const updatedUser = await prisma.user.update({
    where : {id : userId},
    data : {
      name,
      email,
      profile : {
        update : {
          profilePhoto,
          bio
        }
      }
    },
    omit : {
      password : true
    }
  });
  return updatedUser
};




export const userService = {
  registerUserIntoDB,
  getMyProfileFromDB,
  updateMyProfileInDB
}