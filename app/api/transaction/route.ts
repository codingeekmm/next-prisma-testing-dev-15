import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Transaction } from "@prisma/client";
// import { EmployeeRepository } from '@/app/_repositories/Employee';
import { prisma } from "@/app/_utils/prismaSingleton";
// GET API
export async function GET(request: NextRequest) {
  try {
    // get all data from database via model
    const getTransactions = await prisma.transaction.findMany();
    console.log("Find Employee", getTransactions);
    if (getTransactions.length > 0) {
      // logger.info("Call All Employee Success-GET All!")
      return NextResponse.json(getTransactions);
    } else {
      return NextResponse.json({ message: "No record found" }, { status: 404 });
    }
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
// POST API
export async function POST(request: NextRequest) {
  try {
    // get data from body
    const transaciton: Transaction = await request.json();
    console.log("body>>", transaciton);
    // insert data to database via model
    const createdTransaction = await prisma.transaction.create({
      data: {
        ...transaciton,
      },
    });
    // console.log("Created Employee",createdEmployee);
    // logger.info(`Employee ${createdEmployee.id} has been created successfully!.`);
    return NextResponse.json({ createdTransaction }, { status: 201 });
  } catch (e) {
    console.log("Employee Post Error", e);
    // logger.error(`Employee Already exist error!.`);
    // return  new Response(JSON.stringify({message:"error"}),{status:500})
    return NextResponse.json({ message: "Resource Existed" }, { status: 400 });
  }
}
