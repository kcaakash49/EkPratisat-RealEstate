import client from "@/db";

export async function signupservice(fullname: string, email: string, password: string) {
    try {
        // Check if the username or email already exists
        const existingUser = await client.user.findFirst({
            where: {
                OR: [
                    { username: fullname },
                    { email: email },
                ],
            },
        });

        if (existingUser) {
            if (existingUser.username === fullname) {
                return { error: "Username is already taken. Please choose another one." };
            }
            if (existingUser.email === email) {
                return { error: "Email is already registered. Please use another email." };
            }
        }

        // Create a new user if no conflicts exist
        await client.user.create({
            data: {
                username: fullname,
                email: email,
                password: password,
            },
        });

        return { message: "Signup successful" };
    } catch (error) {
        console.error("Error during signup:", error);

        // Return a generic error if something unexpected happens
        return { error: "An unexpected error occurred. Please try again later." };
    }
}
