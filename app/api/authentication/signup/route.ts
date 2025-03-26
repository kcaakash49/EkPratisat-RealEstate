import { signupservice } from "@/services/signupservice";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    
    try {
        const formData = await req.json();
        
        const result = await signupservice(formData);

       if (result.error){
            return NextResponse.json(result, {status: result.status})
        }

        return NextResponse.json(result,{status: result.status});



    }catch(e){
        return NextResponse.json({
            error: "Internal Server Error"
        },{status: 500});
    }


    
}