import { Link } from 'react-router-dom';
import { Avatar } from './Avatar';


interface BlogPropsType {
    authorname: string,
    title: string,
    content: string,
    publishedDate: string,
    id: number
}



export const BlogCard = ({
    authorname,
    title,
    content,
    publishedDate,
    id,
}: BlogPropsType) => {
    return <Link to = {`blog/${id}`}>
         <div className='border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer'>
        
        <div className='flex'>
            
            <Avatar name = {authorname}/>
            <div className="flex justify-center flex-col font-extralight pl-2 text-sm">
            {authorname}
            </div> 
            <div className='flex justify-center flex-col pl-2'>
                <Circle/>
            </div>
            <div className='flex justify-center flex-col text-sm pl-2 font-thin text-slate-500'>
            {publishedDate}
            </div>
        </div>
        <div className = "text-xl font-bold pt-2">
            {title}
        </div>
        <div className='text-md font-semibold'>
            {content.length >= 100 ? 
                content.slice(0,100) + "...." :
                    content.slice(0,100)
                }
        </div>
        <div className='text-slate-500 text-sm font-thin pt-4'>
            {Math.ceil(content.length / 100) > 1 ? ` ${Math.ceil(content.length / 100)} mins read` : `${Math.ceil(content.length / 100)} min read`}
        </div>
    </div>
    </Link>
}




export function Circle () {
    return <div className='w-1 h-1 rounded-full bg-slate-200'>
        </div>
}