import { Appbar } from "../Components/Appbar"
import { BlogCard } from "../Components/BlogCard"
import { Skeleton } from "../Components/Skeleton"
import { useBlogs } from "../hooks"


export const Blogs = () => {
     const  { loading,blogs } = useBlogs()
    
     if(loading){
        return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            </div>
        </div>
        </div>
     }

    return <div>
              <Appbar/>
              <div className="flex justify-center">
              <div>
                     {blogs.map(blog => <BlogCard 
                        authorname= {blog.author.name || "Anonymous"} 
                        publishedDate= "April 1st 2024"
                        title = {blog.title}
                        content= {blog.content}
                        id = {blog.id} />
                        )}
                        
                </div>
                    
            </div>
            </div>
}