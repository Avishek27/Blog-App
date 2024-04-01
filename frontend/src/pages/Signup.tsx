import { Auth } from "../Components/Auth"
import { Quote } from "../Components/Quote"

export const Signup = () => {
    return <div className="grid grid-cols-2">
        <div>
           <Auth type = {"signup"}/>
        </div>
        <div className="hidden lg:block">
        <Quote/>
        </div>
        
        </div>
}