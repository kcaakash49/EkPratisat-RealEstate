// pages/api/auth/signin.js

import { signinservice } from "@/services/signinservice";
import { generateUserToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const { mobile, password } = await req.json();
    console.log(mobile,password);

    if (!mobile || !password) {
      return NextResponse.json(
        {
          error: "Mobile and Password are required",
        },
        { status: 400 }
      );
    }

    const result = await signinservice(mobile, password);

    if (result.error) {
      return NextResponse.json(result, { status: result.status });
    }

    if(result.user){
        const token = generateUserToken(result?.user?.id);
        return NextResponse.json(
          {
            token: token,
            user: result.user
          },
          { status: result.status }
        );

    }

    return NextResponse.json(
        { error: "Unexpected error occurred" },
        { status: 500 }
      );
  } catch (e) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
