import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest){
    try {
        console.log("API called");
        const formData = await req.formData();

        const propertyData = formData.get('data') as string;
        const propertyDetails = JSON.parse(propertyData);
        
        console.log(propertyDetails);

        
       
       


        return NextResponse.json({
            message: "Listing Created Successfully"
        }, {status:200});

    }catch(e){
        return NextResponse.json({
            error: 'INternal Server Error'
        }, {status:500});
    }
}


  