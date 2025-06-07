import client from "@/db";
import { revalidatePath } from "next/cache";

export async function signinservice(mobile: string, password: string){
    try {
        const user = await client.user.findUnique({
            where: {
                mobile: mobile,
                password: password
            }
        })
        
        if (!user){
            return{
                error: "Wrong username or password",
                status: 400
            }
        }
        
        return{
            message: "Login Success",
            user: user,
            status:200
        }
    }catch(e){
        return {
            error: `Something Happened ${e}`,
            status:500
        }
    }
}