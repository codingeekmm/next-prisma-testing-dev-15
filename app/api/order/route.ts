import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Order } from "@prisma/client";
// import { EmployeeRepository } from '@/app/_repositories/Employee';
import { prisma } from "@/app/_utils/prismaSingleton";
// import { OrderRepository } from "../_repositories/Order";
import { Or } from "@prisma/client/runtime/library";

//GET API
export async function GET(request: NextRequest) {
  try {
    // get all data from database via model
    const getOrders = await prisma.order.findMany();
    console.log("Find Employee", getOrders);
    if (getOrders.length > 0) {
      // logger.info("Call All Employee Success-GET All!")
      return NextResponse.json(getOrders);
    } else {
      return NextResponse.json({ message: "No record found" }, { status: 404 });
    }
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

//relation
// export async function GET(request: NextRequest) {
//     try{
//         // get all data from database via model
//         // const getOrders = await prisma.order.findMany();
//         const getOrders = await prisma.order.findMany({
//             include:{
//               user:{
//               },
//               product:{
//             }
//             }

//           });
//         console.log("Find Employee",getOrders)
//         if(getOrders.length>0){
//             // logger.info("Call All Employee Success-GET All!")
//             return NextResponse.json(getOrders)
//         }else{
//             return NextResponse.json({message:"No record found"},{status:404})
//         }
//     }catch(e){
//         console.log("Error",e)
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

//relation with filter
// export async function GET(request: NextRequest) {
//     try{
//         // get all data from database via model
//         // const getOrders = await prisma.order.findMany();
//         const getOrders = await prisma.order.findMany({

//             include:{
//                 product:{
//                   select:{
//                     name:true
//                   }
//                 },
//                 user:{
//                   select:{
//                     name:true
//                   }
//                 }
//               },
//             });

//         console.log("Find Employee",getOrders)
//         if(getOrders.length>0){
//             // logger.info("Call All Employee Success-GET All!")
//             return NextResponse.json(getOrders)
//         }else{
//             return NextResponse.json({message:"No record found"},{status:404})
//         }
//     }catch(e){
//         console.log("Error",e)
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

//Task 6 & 7, select by date
// export async function GET(request: NextRequest) {
//     try{
//         // get all data from database via model
//         // const getOrders = await prisma.order.findMany();
//         const getOrders = await prisma.order.findMany({

//             include:{
//                 product:{
//                   select:{
//                     name:true
//                   }
//                 },
//                 user:{
//                   select:{
//                     name:true
//                   }
//                 }
//               },
//               where: {
//                 createdAt: {
//                     gte: new Date('2023-09-06') ,
//                     lte: new Date('2023-09-08')

//                 },

//             // where: {
//             //     createdAt: {
//             //         'equals': new Date('2023-09-07') ,

//             //     },

//               }
//             });

//           //////

//           /////

//         console.log("Find Employee",getOrders)
//         if(getOrders.length>0){
//             // logger.info("Call All Employee Success-GET All!")
//             return NextResponse.json(getOrders)
//         }else{
//             return NextResponse.json({message:"No record found"},{status:404})
//         }
//     }catch(e){
//         console.log("Error",e)
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

// Task 4 user not paid yet
// export async function GET(request: NextRequest) {
//     try{
//         // get all data from database via model
//         const getOrders = await prisma.order.findMany({
//           select:{
//             id:true,
//             user:{
//               select:{
//                 id:true,
//                 name:true
//               }
//             },
//             product:{
//               select:{
//                 id :true,
//                 name: true
//               }
//             },
//             transaction:{
//               select:{
//                 id:true,
//                 createdAt:true
//               }
//             }
//           },
//           where:{
//               transaction:{
//                 is:null //isNot:null
//               }
//           }
//         }

//         );
//         console.log("Find Employee",getOrders)
//         if(getOrders.length>0){
//             // logger.info("Call All Employee Success-GET All!")
//             return NextResponse.json(getOrders)
//         }else{
//             return NextResponse.json({message:"No record found"},{status:404})
//         }
//     }catch(e){
//         console.log("Error",e)
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

// Task 1
// export async function GET(request: NextRequest) {
//     try{
//         // get all data from database via model
//         const getOrders = await prisma.order.findMany({
//           select:{
//             user:{
//               select:{
//                 id : true,
//                 name : true
//               }

//             }
//           }

//         });
//         console.log("Find Employee",getOrders)
//         if(getOrders.length>0){
//             // logger.info("Call All Employee Success-GET All!")
//             return NextResponse.json(getOrders)
//         }else{
//             return NextResponse.json({message:"No record found"},{status:404})
//         }
//     }catch(e){
//         console.log("Error",e)
//         return NextResponse.json({message:"error"},{status:500})
//     }
// }

// Task8 get max product orders
// export async function GET(request: NextRequest) {
//   try {
//     // const getMaxProducts = await prisma.product.findFirst({
//     //     where:{
//     //         id : getOrders._max.product_id!
//     //     },
//     //     select: {
//     //                 id :true,
//     //                 name : true,
//     //                 model:true ,
//     //                 orders:{
//     //                     select:{
//     //                         id:true,
//     //                         qty:true
//     //                     }
//     //                 }
//     //             },
//     // });

//     // const getOrders = await prisma.order.groupBy({
//     //   by: ["product_id"],
//     //   _sum: {
//     //     qty: true,
//     //   },
//     //   orderBy: {
//     //     _sum: {
//     //       qty: "desc",
//     //     },
//     //   },
//     //   take: 10,
//     // });

//     // const getOrders = await prisma.order.aggregate({
//     //   _max: {
//     //     product_id: true,
//     //     qty: true,
//     //   },
//     // });

//     // const getOrders = await prisma.order.groupBy({
//     //   by: ["product_id"],
//     //   // _count: {
//     //   //   _all: true,
//     //   // },
//     //   _sum: {
//     //     qty: true,
//     //   },
//     //   orderBy: {
//     //     _sum: {
//     //       qty: "desc",
//     //     },
//     //   },
//     //   take: 1,
//     // });

//     const getOrders = await prisma.product.findMany({
//       include: {
//         _count: {
//           select: { orders: true },
//         },
//       },
//     });

//     console.log("Find Employee", getOrders);
//     if (getOrders) {
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(getOrders);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     console.log("Error", e);
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

// Task 3 or 5 (Product with order or no orders)
// export async function GET(request: NextRequest) {
//   try {
//     // get all data from database via model
//     const getOrders = await prisma.product.findMany({
//       select: {
//         id: true,
//         name: true,
//         orders: {
//           select: {
//             product_id: true,
//           },
//         },
//       },
//       where: {
//         orders: {
//           none: {}, //some:{}
//         },
//       },
//     });
//     console.log("Find Employee", getOrders);
//     if (getOrders.length > 0) {
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(getOrders);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     console.log("Error", e);
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

//Task 2 by Ko Tun When user order, select which products are included
// export async function GET(request: NextRequest) {
//   try {
//     // get all data from database via model
//     const result = await prisma.order.findMany({
//       select: {
//         id: true,
//         user: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//         product: {
//           select: {
//             id: true,
//             name: true,
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

//Task 4 by Ko Tun User who order but not paid yet
// export async function GET(request: NextRequest) {
//   try {
//     // get all data from database via model
//     const result = await prisma.order.findMany({
//       select: {
//         id: true,
//         user: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//         transaction: {
//           select: {
//             id: true,
//             createdAt: true,
//           },
//         },
//       },
//       where: {
//         NOT: {
//           transaction: {
//             isNot: null,
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

//Task 8 by Ko Tun Products with most order
// export async function GET(request: NextRequest) {
//   try {
//     const result = await prisma.order.groupBy({
//       by: ["product_id"],
//       _sum: {
//         qty: true,
//       },
//       orderBy: {
//         _sum: {
//           qty: "desc",
//         },
//       },
//       take: 1,
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

// Task 6 & 7 Date
// export async function GET(request: NextRequest) {
//   try {
//     const fromDate = new Date();
//     const toDate = new Date();
//     fromDate.setDate(1); // set first day of month -> sept 1
//     toDate.setMonth(toDate.getMonth() + 1); //Move to the next month ->oct
//     toDate.setDate(0); // Set the day to the last day of the current month -> sept 30

//     const result = await prisma.order.findMany({
//       include: {
//         product: {
//           select: {
//             name: true,
//           },
//         },
//         user: {
//           select: {
//             name: true,
//           },
//         },
//       },
//       where: {
//         createdAt: {
//           gte: new Date(fromDate),
//           lte: new Date(toDate),
//         },
//       },
//     });

//     // console.log("From Date", new Date(fromDate).toISOString());
//     // console.log("To Date", new Date(toDate).toISOString());

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

// Task 9 Select by Input Date
// export async function GET(request: NextRequest) {
//   try {
//     const inputDate = new Date();
//     const result = await prisma.order.findMany({
//       include: {
//         product: {
//           select: {
//             name: true,
//           },
//         },
//         user: {
//           select: {
//             name: true,
//           },
//         },
//       },
//       where: {
//         createdAt: {
//           gte: new Date(inputDate.setDate(inputDate.getDate() - 1)),
//           lte: new Date(inputDate.setDate(inputDate.getDate() + 1)),
//         },
//       },
//     });

//     console.log("Input Date", inputDate);
//     console.log(
//       "Input Date - 1",
//       new Date(inputDate.setDate(inputDate.getDate() - 1))
//     );
//     console.log(
//       "FInput Date + 1",
//       new Date(inputDate.setDate(inputDate.getDate() + 1))
//     );

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

// Task 9 Select one day before laday of month
// export async function GET(request: NextRequest) {
//   try {
//     const inputDate = new Date();
//     inputDate.setMonth(inputDate.getMonth() + 1); //Move to the next month ->oct
//     inputDate.setDate(-1); // Set the day to the last day of the current month -> sept 29
//     //inputDate.setDate(-17); // sept 13

//     const result = await prisma.order.findMany({
//       include: {
//         product: {
//           select: {
//             name: true,
//           },
//         },
//         user: {
//           select: {
//             name: true,
//           },
//         },
//       },
//       where: {
//         createdAt: {
//           gte: new Date(inputDate.setDate(inputDate.getDate() - 1)),
//           lte: new Date(inputDate.setDate(inputDate.getDate() + 1)),
//         },
//       },
//     });

//     console.log("Input Date", inputDate);

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

// POST API
export async function POST(request: NextRequest) {
  try {
    // get data from body
    const order: Order = await request.json();
    console.log("body>>", order);
    // insert data to database via model
    const createdOrder = await prisma.order.create({
      data: {
        ...order,
      },
    });
    // console.log("Created Employee",createdEmployee);
    // logger.info(`Employee ${createdEmployee.id} has been created successfully!.`);
    return NextResponse.json({ createdOrder }, { status: 201 });
  } catch (e) {
    console.log("Employee Post Error", e);
    // logger.error(`Employee Already exist error!.`);
    // return  new Response(JSON.stringify({message:"error"}),{status:500})
    return NextResponse.json({ message: "Resource Existed" }, { status: 400 });
  }
}

// POST API using Repository
// export async function POST(request: NextRequest) {
//   try {
//     const order: Order = await request.json();
//     const createdOrder = await OrderRepository.create(order);
//     console.log("body>>", order);

//     return NextResponse.json({ createdOrder }, { status: 201 });
//   } catch (e) {
//     // console.log("Order Error Start #####");
//     // console.log("Order Error Message", e);
//     // console.log("Order Error End #####");

//     return NextResponse.json({ message: "Error!" }, { status: 400 });
//   }
// }
