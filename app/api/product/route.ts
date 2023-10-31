import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Product } from "@prisma/client";
// import { EmployeeRepository } from '@/app/_repositories/Employee';
import { prisma } from "@/app/_utils/prismaSingleton";

// export async function GET(request: NextRequest) {
//   try {
//     // get all data from database via model
//     const getProducts = await prisma.product.findMany();
//     // console.log("Find Employee",getEmployees)
//     if (getProducts.length > 0) {
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(getProducts);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

//Task5 product never order
// export async function GET(request: NextRequest) {
//   try {
//     // get all data from database via model
//     const getProducts = await prisma.product.findMany({
//       select: {
//         id: true,
//         name: true,
//         orders: {
//           where: {
//             id: "",
//           },
//           select: {
//             id: true,
//           },
//         },
//       },
//     });
//     // console.log("Find Employee",getEmployees)
//     if (getProducts.length > 0) {
//       console.log(getProducts.length);
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(getProducts);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

// Task 8, Most order products
// export async function GET(request: NextRequest) {
//     try{
//         // get all data from database via model
//         const getProducts = await prisma.product.findMany({
//             include: {
//                 _count: {
//                   select: { orders: true },
//                 },
//               },

//         });
//         // console.log("Find Employee",getEmployees)
//         if(getProducts.length>0){
//             // logger.info("Call All Employee Success-GET All!")
//             return NextResponse.json(getProducts)
//         }else{
//             return NextResponse.json({message:"No record found"},{status:404})
//         }
//     }catch(e){
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

// //Task 8, Most order products, max count
// export async function GET(request: NextRequest) {
//   try {
//     //get all data from database via model
//     // const getProducts = await prisma.product.findMany({
//     //     include: {
//     //         _count: {
//     //           select: { orders: true },
//     //         },
//     //       },

//     // });

//     const getProducts = await prisma.product.groupBy({
//       by: ["id"],
//       // _sum: {
//       //   qty: true,
//       // },
//       // orderBy: {
//       //   _sum: {
//       //     qty: "desc",
//       //   },

//       // take: 10,
//     });

//     // console.log("Find Employee",getEmployees)
//     if (getProducts) {
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(getProducts);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

//Task 3 by Ko Tun When user order, select which products are not included
export async function GET(request: NextRequest) {
  try {
    // get all data from database via model
    const result = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        orders: {
          select: {
            product_id: true,
          },
        },
      },
      where: {
        orders: {
          none: {},
        },
      },
    });
    console.log("Find Employee", result);
    if (result.length > 0) {
      // logger.info("Call All Employee Success-GET All!")
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ message: "No record found" }, { status: 404 });
    }
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

//Task 5 by Ko Tun Select Products that never order
// export async function GET(request: NextRequest) {
//   try {
//     // get all data from database via model
//     const result = await prisma.product.findMany({
//       select: {
//         id: true,
//         orders: {
//           select: {
//             id: true,
//           },
//         },
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
//     console.log("Find Employee", result);
//     if (result.length > 0) {
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(result);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     console.log("Error", e);
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

export async function POST(request: NextRequest) {
  try {
    // get data from body
    const product: Product = await request.json();
    console.log("body>>", product);
    // insert data to database via model
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
      },
    });
    // console.log("Created Employee",createdEmployee);
    // logger.info(`Employee ${createdEmployee.id} has been created successfully!.`);
    return NextResponse.json({ createdProduct }, { status: 201 });
  } catch (e) {
    console.log("Employee Post Error", e);
    // logger.error(`Employee Already exist error!.`);
    // return  new Response(JSON.stringify({message:"error"}),{status:500})
    return NextResponse.json({ message: "Resource Existed" }, { status: 400 });
  }
}
