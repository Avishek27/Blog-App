import axios from "axios"
import { Appbar } from "../Components/Appbar"
import { TextEditor } from "../Components/TextEditor"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    const navigate = useNavigate();
    return <div>
        <Appbar/>
        <div className="flex justify-center w-full pt-8">
           <div className="max-w-screen-lg w-full">
                <input onChange = { (e) => {
                    setTitle(e.target.value);
                }
                }type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500 mb-2" placeholder="Title"/>
           <TextEditor onChange={(e) =>{ 
            setContent(e.target.value);
           }}/>
           <button onClick = {async () => {
    const response = await axios.post(`${BACKEND_URL}api/v1/blog/create`,{
                title,
                content
    },{
        headers: {
            Authorization: localStorage.getItem("token")
        }
    });
    navigate(`blogs/blog/${response.data.id}`);

   }}type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 
   text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4
    focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
       Publish post
   </button>
           </div>
           
         </div>
         
        </div>
}