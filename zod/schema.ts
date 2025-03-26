import { Role } from "@prisma/client";
import { z } from "zod";

export const ListingSchema = z.object({
  title: z.string(),
  description: z.string(),
  bathrooms: z.number().nullable().optional(),
  bedrooms: z.number().nullable().optional(),
  category: z.enum([
    "house",
    "flat",
    "apartment",
    "business",
    "hostel_boys",
    "hostel_girls",
    "land",
    "room",
  ]),
  location: z.string(),
  price: z.number(),
  type: z.enum(["sale", "rent"]),
  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.type.startsWith("image/") && file.size > 0, {
          message: "Each file must be an image and not empty",
        })
    )
    .min(1, "At least one image"),
  landArea: z.number().nullable().optional(),
  numberOfFloors: z.number().nullable().optional(),
  houseArea: z.number().nullable().optional(),
  area: z.number().nullable().optional(),
});

export const signUpSchema = z.object({
  fullname: z
    .string()
    .trim() // Trims leading and trailing spaces before validation
    .refine((val) => val.split(" ").filter(Boolean).length > 1, {
      message: "Full name must contain at least two words.",
    }),
  email: z.string().email(),
  mobile: z.string().length(10, { message: "Number must be exact 10 digits"}),
  password: z
    .string()
    .min(10, { message: "alteast 10 character long, at least one uppercase, one number and one special character" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[\W_]/, { message: "Password must contain at least one special character." }),
  role: z.enum(["USER", "PARTNER", "ADMIN"]).optional(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type CreateListingSchema = z.infer<typeof ListingSchema>;


