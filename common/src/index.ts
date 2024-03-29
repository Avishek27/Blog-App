import z from "zod";

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

export const signInInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
});

export const blogInput = z.object({
    title: z.string(),
    content: z.string(),
});

export const blogUpdateInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number(),
});


export type signInput = z.infer<typeof signupInput>
export type signedInput = z.infer<typeof signInInput>
export type blogcreateInput = z.infer<typeof blogInput>
export type updateblogInput = z.infer<typeof blogUpdateInput>




