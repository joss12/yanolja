import React, {useState, useEffect} from 'react'
import  {useLocation, useNavigate} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth'


function Header() {
    const [pageState, setPageState] = useState("sing in")

    const location  = useLocation();
    const navigate = useNavigate();
    
    const auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setPageState("Profile")
            }else{
                setPageState("Sign In")
            }
        })
    },[auth])

    function pathMatchRoute(route){
        if(route === location.pathname){
            return true
        }
    }
  return (
    /*Styling the navbar */
    <div className="bg-white border-b shadow-sm sticky top-0
    z-40">
        {/* Styling the header */}
        <header className="flex justify-between items-center
        px-3 max-w-6xl mx-auto">
            <div>
               
                 <img src="https://yaimg.yanolja.com/joy/sunny/static/images/home-ya-logo-2.svg" alt="logo" 
                    className='h-5 cursor-pointer'
                    onClick={()=>navigate("/")}
                 />
            </div>
            <div>
            {/*Putting space between them */}
            <ul className='flex space-x-10'>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-grey-400
                border-b-[3px] border-b-transparent
                ${pathMatchRoute("/") && 
                "text-black border-b-red-500" }`}
                onClick={()=> navigate("/")}
                >

                Home
                
                </li>
                <li
                className={`cursor-pointer py-3 text-sm font-semibold text-grey-400
                border-b-[3px] border-b-transparent
                ${pathMatchRoute("/offers") && 
                "text-black border-b-red-500" }`}
                onClick={()=> navigate("/offers")}
                >

                Offers
                
                </li>
                <li
                className={`cursor-pointer py-3 text-sm font-semibold text-grey-400
                border-b-[3px] border-b-transparent
                ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && 
                "text-black border-b-red-500" }`}
                onClick={()=> navigate("/profile")}
                >

                {pageState}

                </li>
            </ul>

            </div>
        </header>
    </div>
  )
}

export default Header