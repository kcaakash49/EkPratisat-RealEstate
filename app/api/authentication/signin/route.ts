// pages/api/auth/signin.js

import { signinservice } from "@/services/signinservice";
import { generateUserToken } from "@/utils/jwtToken";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// Adjust the path based on where your signinservice is

// export  async function POST(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === "POST") {
//         const { mobile, password } = req.body;

//         if (!mobile || !password) {
//             return res.status(400).json({ error: "Mobile and password are required" });
//         }

//         try {
//             const result = await signinservice(mobile, password);

//             if (result.error) {
//                 return res.status(400).json(result); // Returning error message
//             }

//             return res.status(200).json(result); // Returning success message and user data
//         } catch (e) {
//             return res.status(500).json({ error: "Internal Server Error" });
//         }
//     } else {
//         // Handle any other HTTP method
//         res.setHeader("Allow", ["POST"]);
//         return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
//     }
// }

// export async function POST (req: NextRequest, res: NextResponse) {

//     const  {mobile, password} = await req.body;

//     if(!mobile || !password){
//         return res.status(200).json({
//             error: "Mobile and Password are required"
//         })
//     }

//     try {
//         const result = await signinservice(mobile,password);

//         if (result.error){
//             return res.status(400).json(result)
//         }

//         return res.status(200).json(result);
//     } catch(e){
//         return res.status(500).json({
//             error: "Internal Server Error"
//         })
//     }

// }

export async function POST(req: NextRequest) {
  try {
    const { mobile, password } = await req.json();

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
      return NextResponse.json(result, { status: 400 });
    }

    if(result.user){
        const token = generateUserToken(result?.user?.id);
        return NextResponse.json(
          {
            token: token,
          },
          { status: 200 }
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
