import { Link, useNavigate } from "react-router-dom"
import { Button } from "./Button"
import { InputBox } from "./InputBox";
import { useState } from "react";
import { signInput } from "@avi_0912/common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: {type: "signup" | "signin"}) => {
    const [postInputs,setPostInputs] = useState<signInput>({
        name: "",
        username: " ",
        password: "",
    });
    const navigate = useNavigate();
    

    async function sendRequests(){
        try{
        const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === "signup" ? "signup": "signin"}`,postInputs);
        const jwt = response.data.jwt;
        localStorage.setItem("token","Bearer " + jwt);
        navigate("/blogs");
        }catch(e){
           console.log("Error while sending the request");
        }
        
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="px-10">
               <div className="text-3xl font-bold">
                   {type === "signup" ? "Create an account" : "Log In"}
               </div>
               <div className="text-slate-400 mb-4">
                {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                <Link className="pl-2 underline" to = {type === "signin" ? "/signup" : "/signin"}>
                    {type === "signin" ? "Sign Up" : "Sign In"}
                </Link>
            </div>
            <div>
            {type === "signup" ? <InputBox label= {"Name"} placeholder="John Doe..." onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                })
            }}/> : null}
            <InputBox label= {"Email"} placeholder="example@gmail.com" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    username: e.target.value,
                })
            }}/>
            <InputBox label= {"Password"} type = {"password"} placeholder="123456" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                })
            }}/>  
              </div>
              <div>
                <Button onClick = {sendRequests} label = {type === "signup" ? "Sign up" : "Sign In"}/>
              </div>
            </div>
            
        </div>
        
    </div>
}