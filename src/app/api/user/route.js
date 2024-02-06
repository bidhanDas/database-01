import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";



//Insert One (one json object)
export async function POST(req,res){
    try{
        const x = new PrismaClient(); //instance, name it prisma
        const y = await req.json(); //name it result

        await x.users.create(
            {
                data: y
            }
        );

        return NextResponse.json({status:'Success'});
    }
    catch (e) {
        return NextResponse.json({status:'Fail',data:e});
    }
}
// data: {
//         email: 'Jhon@gmail.com',
//         password: '123',
//       }
// kono data sara postman theke sudhu request pathalei execute hobe
 


//Insert Many (json array)
export async function POST(req,res){
    try{
        const x = new PrismaClient(); //instance
        const y = await req.json();

        await x.users.createMany(
            {
                data: y
            }
        );

        return NextResponse.json({status:'Success'});
    }
    catch (e) {
        return NextResponse.json({status:'Fail',data:e});
    }
}
// data: [
//     {email: 'Jhon1@gmail.com', password: '123'},
//     {email: 'Jhon2@gmail.com', password: '123'},
//     {email: 'Jhon3@gmail.com', password: '123'}
//     ]
// kono data sara postman theke sudhu request pathalei execute hobe



//Delete
export async function DELETE(req,res){ //deleteMany
    try{
        const x = new PrismaClient(); //instance
        const y = await req.json();

        await x.users.delete(
            {
                where:y // { "id":1 }
            }
        );

        return NextResponse.json({status:'Success'});
    }
    catch (e) {
        return NextResponse.json({status:'Fail',data:e});
    }
}



//Update {"firstName":"A", "id":"5"}
export async function PUT(req,res){
    try{
        const x = new PrismaClient(); //instance
        const y = await req.json();

        await x.users.update(
            {
                where:{id:y.id},
                data:{firstName:y.firstName}

            }
        );

        return NextResponse.json({status:'Success'});
    }
    catch (e) {
        return NextResponse.json({status:'Fail',data:e});
    }
}



//Select
export async function GET(req,res){
    try{
        const x = new PrismaClient(); //instance

        // await x.users.findMany(); //sobgula
        await x.users.findMany(
            {
                where: {id:5}, //that row, jdi sudhu_where use kora hoy
                select: {id:true, email:true} //that column sobgula row ar, jdi sudhu_select use kora hoy
            }
        );

        return NextResponse.json({status:'Success'}); //json array *findMany
    }
    catch (e) {
        return NextResponse.json({status:'Fail',data:e});
    }
}



//Select
export async function GET(req,res){
    try{
        const x = new PrismaClient(); //instance

        await x.users.findUnique(
            {
                where:{id:4} //onk row thakleo akta select hobe
            }
        );  

        return NextResponse.json({status:'Success'}); //one json object, not jason array
    }
    catch (e) {
        return NextResponse.json({status:'Fail',data:e});
    }
}



//Select
export async function GET(req,res){
    try{
        const x = new PrismaClient(); //instance

        await x.users.findMany(
            {
                orderBy:{id:'asc'} //desc
            }
        );

        return NextResponse.json({status:'Success'});
    }
    catch (e) {
        return NextResponse.json({status:'Fail',data:e});
    }
}



//Select
export async function GET(req,res){
    try{
        const x = new PrismaClient(); //instance

        await x.users.findFirst(); //1st row created
        
        //last row created
        const y = await x.users.findMany(
            {
                orderBy:{id:'desc'},
                take:1
            }
        );

        return NextResponse.json({status:'Success', data:y});
    }
    catch (e) {
        return NextResponse.json({status:'Fail',data:e});
    }
}
// await x.User.findFirst(
//     {orderBy:{id:"desc"}}
//     );

//  id
//  1
//  2
//  3
//--------------
//  take:-2 => 2
//             3


//Select (Pagination)
export async function GET(req,res){
    try{
        const x = new PrismaClient(); //instance
        
        await x.users.findMany(
            {
                skip:2, //1st 2ta skip kore porer 3ta
                take:3 //1st 3 rows, sudhu_take dile
            }
        );

        return NextResponse.json({status:'Success'});
    }
    catch (e) {
        return NextResponse.json({status:'Fail',data:e});
    }
}

// cursor: { id: 2 }, 
// take: 3
// //id 2 theke/soho



// =============================================================================================================



//Inserting with Relations
export async function POST(req,res){
    try{
        const x = new PrismaClient(); //instance

        await x.User.create(
            {
                data: {
                    email: 'Jhon@gmail.com',
                    password: '123',
                    profile:{ //j nam disi

                        create: { //foreign key dite hobe na, auto
                            firstName:"Jhon",
                            lastName:"De",
                            mobile:"01700000000",
                            city:"Dhaka"
                        }
                    }
                }
            }
        );

        return NextResponse.json({status:'Success'});
    }
    catch (e) {
        return NextResponse.json({status:'Fail',data:e});
    }
}
//Transactions & Rollback
//User table a dhukse kintu Profile table a dhuke nai tkn Rollback hobe 
//dhukle 2ta tei dhukbe(Transactions) noyto aktateo na



//Select With Relation
export async function POST(req,res){
    try{
        const x = new PrismaClient(); //instance

        const y = await x.User.findMany(
            {
                include: {profile:true, post:true} //User ar sathe Profile o asbe Post o asbe foreign key relation onusare
            }
        );

        return NextResponse.json({status:'Success', data:y});
    }
    catch (e) {
        return NextResponse.json({status:'Fail',data:e});
    }
}



//Select With Nested Relations
const y = await x.User.findMany(
    {
        include:{
            post:{
                where:{
                    title:{contains: "xyz"} //title ar modhe 'xyz' ase
                },
                orderBy:{id:"desc"}
            }
            
        }
    }
);



//Aggregate (avg,count,max,min,sum)
const y = await x.Employee.aggregate({
    _avg: { salary: true }, //_avg built in
    _count: { salary: true },
    _max: { salary: true },
    _min: { salary: true },
    _sum: { salary: true },
    });

//data:y
// {
//     "data":{"_avg":{"salary":82700}}
// }



//Aggregate (groupBy,having)
const y = await x.Employee.groupBy({
    by: ["city"],
    _count: { salary: true }, //sudhu row count hobe
    })

const y = await x.Employee.groupBy({
    by: ["city"], 
    _sum: { salary: true }, //think sudhu aituku
    having: { city: "Chicago"} //tarpor aituku
    });



//Time Calculation
const startTime = Date.now();
const result = await prisma.Employee.findMany();
const executionTime = (Date.now() - startTime) + " milliseconds";



//Raw queries
const prisma = new PrismaClient();
const result = await prisma.$queryRaw `SELECT * FROM employee`;



//Comparison Operators
const result = await prisma.Employee.findMany({
    where:{salary:{equals:75000}}
});

const result = await prisma.Employee.findMany({
    where:{salary:{lt:75000}}
});

const result = await prisma.Employee.findMany({
    where:{salary:{lte:75000}}
});

const result = await prisma.Employee.findMany({
    where:{salary:{gt:75000}}
});

const result = await prisma.Employee.findMany({
    where:{salary:{gte:75000}}
});
    
const result = await prisma.Employee.findMany({
    where:{salary:{not:75000}}
});
    
const result = await prisma.Employee.findMany({
    where:{salary:{in:[75000,60000]}} //a specified array of values, () bad diye, [] soho
});
    
const result = await prisma.Employee.findMany({
    where:{salary:{notIn:[75000,60000]}} //a specified array of values
});

const result = await prisma.Employee.findMany({
    where:{name:{contains:'John'}} //a specified substring
});

const result = await prisma.Employee.findMany({
        where:{name:{startsWith:'J'}} //a specified substring
    });

const result = await prisma.Employee.findMany({
    where:{name:{endsWith:'n'}} //a specified substring
});



//Logical Operators
const result = await prisma.Employee.findMany({
    where:{
        AND: [
            { name: {contains:"Alice"} },
            { salary: { gt: 50000 } }
        ]
    }
});

const result = await prisma.Employee.findMany({
    where:{
        OR: [
            { name: {contains:"Alice"} },
            { salary: { gt: 50000 } }
        ]
    }
});

const result = await prisma.Employee.findMany({
    where:{
        NOT:[
           { name: {contains:"Alice"} },
           { salary: { gt: 90000 } }
        ]
    }
});



//Date Operators
const result=await prisma.Employee.findMany({
    where:{
        birthDay:{
            lt:new Date("2023-10-11"), //y/m/d
            gt:new Date("2017-10-11")
        }
        //ai range ar moddhe, akta diloe kaj korbe
    }
});
//gte, lte