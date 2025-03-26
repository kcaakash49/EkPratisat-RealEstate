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
                error: "Wrong username or password"
            }
        }
        
        return{
            message: "Login Success",
            user: user
        }
    }catch(e){
        return {
            error: `Something Happened ${e}`
        }
    }
}