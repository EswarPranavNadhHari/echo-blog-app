import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@eswar-pranav-nadh/common"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        prisma: any
    }
}>();

userRouter.post('/signup', async c => {
    const prisma = c.get("prisma")
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({ error: "invalid input" })
    }

    try {
        const userData = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name ? body.name : "Anonymous"
            }
        })
        const jwtToken = await sign({ id: userData.id }, c.env.JWT_SECRET)

        return c.json({
            jwt: jwtToken
        })

    } catch (error: any) {
        // console.log(error)
        c.status(500);
        return c.json({ message: "Try again later" })
    }

})

userRouter.post('/signin', async c => {
    const prisma = c.get("prisma");
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({ error: "invalid input" })
    }

    try{
        const userData = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })
    
        if (!userData) {
            c.status(403);
            return c.json({ error: "user not found" })
        }
    
        const jwtToken = await sign({ id: userData.id }, c.env.JWT_SECRET)
    
        return c.json({
            jwt: jwtToken
        })
    } catch (e) {
        // console.log(e)
        c.status(400);
        return c.json({error: "check your inputs"})
    }

})