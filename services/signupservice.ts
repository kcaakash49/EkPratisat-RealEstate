import client from "@/db";
import { signUpSchema, SignUpSchema } from "@/zod/schema";
import { Role } from "@prisma/client";

export async function signupservice(formData: SignUpSchema) {
    try {
        const result = signUpSchema.safeParse(formData);
        console.log(result.error?.format());
        if (!result.success) {
            const formattedErrors: any = result.error?.format();
            console.log(formattedErrors)
            const simplifiedErrors = Object.keys(formattedErrors).reduce(
                (acc: any, key) => {
                    // Skip the _errors property as it is not a form field
                    if (key !== "_errors" && formattedErrors[key]._errors.length > 0) {
                        acc[key] = formattedErrors[key]._errors[0]; // Take the first error message
                    }
                    return acc;
                },
                {}
            );
            return {
                error: simplifiedErrors,
                status: 400
               
            };
        }
        const existingUser = await client.user.findFirst({
            where: {
                OR: [{ mobile: formData.mobile }, { email: formData.email }],
            },
        });

        if (existingUser) {
            if (existingUser.mobile === formData.mobile) {
                return {
                    error: {
                        error: "Phone Number is already taken. Please choose another one.",
                        
                    },
                    status : 403
                };
            }
            if (existingUser.email === formData.email) {
                return {
                    error: {
                        error: "Email is already registered. Please use another email.",
                        
                    },
                    status: 403
                };
            }
        }

        // Create a new user if no conflicts exist
        await client.user.create({
            data: formData,
        });

        return { message: "Signup successful",status: 200 };
    } catch (error) {
        // console.error("Error during signup:", error);

        // Return a generic error if something unexpected happens
        return {
            error: { error: "An unexpected error occurred. Please try again later." },
            status: 500
        };
    }
}
