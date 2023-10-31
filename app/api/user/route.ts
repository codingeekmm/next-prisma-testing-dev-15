import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "@prisma/client";
// import { EmployeeRepository } from '@/app/_repositories/Employee';
import { prisma } from "@/app/_utils/prismaSingleton";
// import { UserRepository } from "../_repositories/User";

//Find all
// export async function GET(request: NextRequest) {
//     try{
//         // get all data from database via model
//         const getUsers = await prisma.user.findMany();
//         console.log("Find Employee",getUsers)
//         if(getUsers.length>0){
//             // logger.info("Call All Employee Success-GET All!")
//             return NextResponse.json(getUsers)
//         }else{
//             return NextResponse.json({message:"No record found"},{status:404})
//         }
//     }catch(e){
//         console.log("Error",e)
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

//Find all with relation
// export async function GET(request: NextRequest) {
//     try{
//         // get all data from database via model
//         // const getUsers = await prisma.user.findMany();
//         const getUsers = await prisma.user.findMany({
//             include:{
//               orders:{
//                 include:{
//                   product:{
//                   }
//                 }
//               }
//             }
//           });
//         console.log("Find Employee",getUsers)
//         if(getUsers.length>0){
//             // logger.info("Call All Employee Success-GET All!")
//             return NextResponse.json(getUsers)
//         }else{
//             return NextResponse.json({message:"No record found"},{status:404})
//         }
//     }catch(e){
//         console.log("Error",e)
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

//Select fields
// export async function GET(request: NextRequest) {
//     try{
//         // get all data from database via model
//         const getUsers = await prisma.user.findMany({
//             select: {
//                 name: true,
//                 email: true
//             }
//         });
//         console.log("Find Employee",getUsers)
//         if(getUsers.length>0){
//             // logger.info("Call All Employee Success-GET All!")
//             return NextResponse.json(getUsers)
//         }else{
//             return NextResponse.json({message:"No record found"},{status:404})
//         }
//     }catch(e){
//         console.log("Error",e)
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

//Find all by date
// export async function GET(request: NextRequest) {
//     try{
//         // get all data from database via model
//         const getUsers = await prisma.user.findMany({

//             //less than
//             // where: {
//             //     createdAt: { lte: new Date('2023-09-08') },
//             //   },

//             //greater than
//             // where: {
//             //     createdAt: { gt: new Date('2023-09-06') },
//             //   }

//               where: {
//                 createdAt: {
//                     gte: new Date('2023-09-01') ,
//                     lte: new Date('2023-09-30') ,
//                 },
//               }

//           });
//         console.log("Find Employee",getUsers)
//         if(getUsers.length>0){
//             // logger.info("Call All Employee Success-GET All!")
//             return NextResponse.json(getUsers)
//         }else{
//             return NextResponse.json({message:"No record found"},{status:404})
//         }
//     }catch(e){
//         console.log("Error",e)
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

//Task 2 user, order, products
// export async function GET(request: NextRequest) {
//     try{
//         const result = await prisma.order.findMany({
//             select:{
//               id:true,
//               user:{
//                 select:{
//                   id:true,
//                   name:true
//                 }
//               },
//               product:{
//                 select:{
//                   id:true,
//                   name:true
//                 }
//               }
//             }
//           });
//       console.log("User Product Order Count",result.length);
//       if(result.length>0){
//           // logger.info("Call All Employee Success-GET All!")
//           return NextResponse.json(result)
//       }else{
//           return NextResponse.json({message:"No record found"},{status:404})
//       }
//     }catch(e){
//         console.log("Error",e)
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

//Task1 Select users who never submit orders
// export async function GET(request: NextRequest) {
//     try{
//         // get all data from database via model
//         const getUsers = await prisma.user.findMany({

//           select:{
//             name :true,
//             orders:{
//               where :{
//                 id : ""
//               },
//               select : {
//                 id:true,
//                 // product:{
//                 //   select:{
//                 //     id:true,
//                 //     name :true
//                 //   }
//                 // }
//               }
//             }
//           },

//         });

//         console.log("Find Employee",getUsers)
//         if(getUsers.length>0){
//             // logger.info("Call All Employee Success-GET All!")
//             return NextResponse.json(getUsers)
//         }else{
//             return NextResponse.json({message:"No record found"},{status:404})
//         }
//     }catch(e){
//         console.log("Error",e)
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

//Task 1 by Ko Tun
// export async function GET(request: NextRequest) {
//   try {
//     // get all data from database via model
//     const getUsers = await prisma.user.findMany({
//       select: {
//         id: true,
//         name: true,
//       },
//       where: {
//         NOT: {
//           orders: {
//             some: {
//               // Your condition forhere (in this case, we want product with no orders)
//             },
//           },
//         },
//       },
//     });
//     console.log("Find Employee", getUsers);
//     if (getUsers.length > 0) {
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(getUsers);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     console.log("Error", e);
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

//Count test
// export async function GET(request: NextRequest) {
//   try {
//     // get all data from database via model
//     const getUsers = await prisma.user.findMany({
//       include: {
//         _count: {
//           select: { orders: true },
//         },
//       },
//     });
//     console.log("Find Employee", getUsers);
//     if (getUsers.length > 0) {
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(getUsers);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     console.log("Error", e);
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

//Role 0 to User, 1 to Admin
export async function GET(request: NextRequest) {
  try {
    // get all data from database via model
    const users = await prisma.user.findMany();
    // Map the role values to descriptions
    const usersWithDescriptions = users.map((user) => ({
      ...user,
      role_description:
        user.role === 0 ? "User" : user.role === 1 ? "Admin" : "Unknown",
    }));

    console.log("Find Employee", usersWithDescriptions);
    if (usersWithDescriptions.length > 0) {
      // logger.info("Call All Employee Success-GET All!")
      return NextResponse.json(usersWithDescriptions);
    } else {
      return NextResponse.json({ message: "No record found" }, { status: 404 });
    }
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // get data from body
    const user: User = await request.json();
    console.log("body>>", user);
    // insert data to database via model
    const createdUser = await prisma.user.create({
      data: {
        ...user,
      },
    });
    //console.log("body>>", user);
    // const createdUser = await UserRepository.create(user);
    // console.log("Created Employee",createdEmployee);
    // logger.info(`Employee ${createdEmployee.id} has been created successfully!.`);
    return NextResponse.json({ createdUser }, { status: 201 });
  } catch (e) {
    console.log("Employee Post Error", e);
    // logger.error(`Employee Already exist error!.`);
    // return  new Response(JSON.stringify({message:"error"}),{status:500})
    return NextResponse.json({ message: "Resource Existed" }, { status: 400 });
  }
}
