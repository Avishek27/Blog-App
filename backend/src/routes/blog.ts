import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { blogInput,blogUpdateInput } from "@avi_0912/common";

export const blogRouter = new Hono<{
  Bindings : {
    DATABASE_URL: string,
    JWT_SECRET: string
   },
   Variables: {
      userId: string
   }
}>();

  blogRouter.use('/*',async (c,next)=>{
  //get the header
  const authHeader = c.req.header("Authorization") || "";
  //get the token
  const token = authHeader.split(" ")[1];
  //verify the header
  const user = await verify(token,c.env.JWT_SECRET);
  if(!user){
    c.status(411);
    return c.json({
      error: "User is not authenticated",
    });
  }else{
    c.set("userId",user.id);
    await next();
    }
  });  



  blogRouter.post('/create', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = blogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      error: "inputs are not correct",
    });
  }
    const authorId = c.get("userId");
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: parseInt(authorId),
        
      }
    });
    return c.json({
      id: blog.id,
      
    });
  })
  
  blogRouter.put('/change', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = blogUpdateInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      error: "inputs are not correct",
    });
  }
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      }
    });
    return c.json({
      id: blog.id,
    });
  });

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        id: true,
        title: true,
        author: {
          select:{
             name: true,
        }
      }
      }
  });
    return c.json({
      blogs,
      
    });
  });
  
  
  blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    
    const id = c.req.param("id");
    try{
      // console.log(id,"Code entering try block");
      const blog = await prisma.blog.findFirst({
        where:{
          id: Number(id),
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              name: true
            }
          }
        }
      });
      return c.json({
       blog: blog,
      });
    }catch(e){
      c.status(404);
      return c.json({
        error: "Error while fetching blogs",
      })
    }
  })
  
  
  

