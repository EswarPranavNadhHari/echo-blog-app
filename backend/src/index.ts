import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { cors } from 'hono/cors'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        prisma: any
    }
}>();

app.use('/*', cors())

app.use("*", async (c, next) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    c.set("prisma", prisma);
    await next();
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.get('/api/v1/bulk', async c => {
    const prisma = c.get("prisma");
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true
            },
            distinct: ['id'],
            select: {
                id: true,
                title: true,
                // content: true,
                description: true,
                words: true,
                image: true,
                date: true,
                published: true,
                authorId: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({
            blogs: posts
        })
    }
    catch (e) {
        console.log(e)
        c.status(400);
        return c.json({
            error: "error fetching blogs"
        })
    }
})

app.get('/api/v1/:id', async c => {
    const prisma = c.get("prisma");
    const id = c.req.param("id");
    try {
        const blogPost = await prisma.post.findFirst({
            where: {
                id,
                published: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                description: true,
                words: true,
                image: true,
                date: true,
                published: true,
                authorId: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog: blogPost
        })
    } catch (e) {
        console.log(e)
        c.status(204);
        return c.json({
            error: "post is not available"
        })
    }
})


export default app
