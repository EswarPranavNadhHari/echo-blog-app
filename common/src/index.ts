import z from "zod";

export const signupInput = z.object({
    email: z.string().email().min(1, { message: "Email cannot be empty" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    name: z.string().optional(),
});

export const signinInput = z.object({
    email: z.string().email().min(1, { message: "Email cannot be empty" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const createPostInput = z.object({
    title: z.string().min(1, { message: "Title cannot be empty" }),
    content: z.string().min(1, { message: "Content cannot be empty" }),
    description: z.string().min(1, { message: "Description cannot be empty" }),
    image: z.string().optional(),
    words: z.number().min(1, { message: "Content cannot be empty" }),
    date: z.string().min(1, { message: "Date cannot be empty" })
});

export const updatePostInput = z.object({
    title: z.string().min(1, { message: "Title cannot be empty" }).optional(),
    content: z.string().min(1, { message: "Content cannot be empty" }).optional(),
    description: z.string().min(1, { message: "Description cannot be empty" }).optional(),
    image: z.string().optional(),
    words: z.number().min(1, { message: "Content cannot be empty" }),
    date: z.string().min(1, { message: "Date cannot be empty" })
});

export type SignupType = z.infer<typeof signupInput>;
export type SigninType = z.infer<typeof signinInput>;
export type CreatePostType = z.infer<typeof createPostInput>;
export type UpdatePostType = z.infer<typeof updatePostInput>;