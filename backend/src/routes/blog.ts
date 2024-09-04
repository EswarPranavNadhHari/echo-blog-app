import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from "@eswar-pranav-nadh/common"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: {},
        prisma: any
    }
}>();

//authorization middleware for blog posts
blogRouter.use('/*', async (c, next) => {

    let jwtToken = c.req.header('authorization') || "";
    jwtToken = jwtToken.split(" ")[1];
    // console.log(jwtToken)

    try {
        const response = await verify(jwtToken, c.env.JWT_SECRET);
        if (response.id) {

            const userId = response.id
            // console.log(userId)
            c.set("userId", userId)
            await next();
        }

    }
    catch {
        c.status(403);
        return c.json({ message: "you are not authorized!!" })
    }

})

//endpoint to create blog post
blogRouter.post('', async c => {
    const prisma = c.get("prisma");
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" })
    }
    try {
        const blogPost = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                description: body.description,
                words: body.words,
                image: body.image,
                date: body.date,
                authorId: c.get("userId")
            },
            select: {
                id: true,
                title: true,
                content: true,
                description: true,
                words: true,
                image: true,
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
    } catch (error) {
        console.log(error);
        c.status(400);
        return c.json({
            error: "check your inputs"
        })
    }
})

//endpoint to edit existing blogpost
blogRouter.put('', async c => {
    const prisma = c.get("prisma");
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" })
    }
    try {
        const blogPost = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
                description: body.description,
                date: body.date,
                words: body.words,
                image: body.image
            },
            select: {
                id: true,
                title: true,
                content: true,
                image: true,
                description: true,
                words: true,
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
        c.status(400);
        return c.json({
            error: "check your inputs"
        })
    }
})

//endpoint to fetch all the self posts of the this user
blogRouter.get('/myprofile', async c => {
    const prisma = c.get("prisma");
    try {
        const blogs = await prisma.post.findMany({
            where: {
                authorId: c.get("userId")
            },
            select: {
                id: true,
                title: true,
                // content: true,
                description: true,
                words: true,
                image: true,
                published: true,
                authorId: true,
                date: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blogs
        })
    } catch (error) {
        console.log(error);
        c.status(400);
        return c.json({
            error: "check your inputs"
        })
    }
})

//endpoint to publish the blog post by the this user
blogRouter.post('/publish', async c => {
    const prisma = c.get("prisma");
    const body = await c.req.json();
    try {
        const blogPost = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
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
        c.status(400);
        return c.json({
            error: "check your inputs"
        })
    }
})

//endpoint to unpublish the post by this user
blogRouter.post('/unpublish', async c => {
    const prisma = c.get("prisma");
    const body = await c.req.json();
    try {
        const blogPost = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                published: false
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
        c.status(400);
        return c.json({
            error: "check your inputs"
        })
    }
})

//endpoint to fetch all the published posts of other users and all posts of this user
blogRouter.get('/bulk', async c => {
    const prisma = c.get("prisma");
    const userId = c.get("userId")
    try {
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        published: true
                    },
                    {
                        authorId: userId
                    }
                ]
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

//endpoint to fetch a particular post by other user if published or to fetch a particular post of this user irrespetive of whether it is published or not
blogRouter.get('/:id', async c => {
    const prisma = c.get("prisma");
    const id = c.req.param("id");
    const userId = c.get("userId")
    try {
        const blogPost = await prisma.post.findFirst({
            where: {
                OR: [
                    {
                        id,
                        published: true
                    },
                    {
                        id,
                        authorId: userId
                    }
                ]
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

//endpoint to fetch all the published posts of particular author using his authorId
blogRouter.get('/author/:id', async c => {
    const prisma = c.get("prisma");
    const id = c.req.param("id")
    try {
        const blogPost = await prisma.post.findMany({
            where: {
                authorId: id,
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
            error: "posts are not available"
        })
    }
})

blogRouter.get('/user/:id/name', async c => {
    const prisma = c.get("prisma");
    const id = c.req.param("id");
    const userId = c.get("userId");

    if (userId !== id) {
        throw new Error("unauthorized");
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                name: true,
            },
        });

        if (!user) {
            c.status(404);
            return c.json({ error: "User not found" });
        }

        return c.json({
            name: user.name,
        });
    } catch (e) {
        console.log(e);
        c.status(403);
        return c.json({
            error: "Unauthorized",
        });
    }
});
