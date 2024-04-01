import { ChangeEvent } from "react"


export const TextEditor = ({ onChange }: {onChange : (e: ChangeEvent<HTMLTextAreaElement>) => void}) => {
    return <form>
   <div className="w-full mb-4 ">
       <div className="flex items-center justify-between border">        
       <div className="py-2 bg-white rounded-b-lg w-full">
           <label className="sr-only">Publish post</label>
           <textarea onChange = {onChange} id="editor" rows={8} className="focus: outline-none block w-full px-2 py-2 text-sm
            text-gray-800 bg-white border-0 focus:ring-0
             dark:text-white dark:placeholder-gray-400" placeholder="Write an article..." required />
             </div>
       </div>
   </div>
   
</form>
}