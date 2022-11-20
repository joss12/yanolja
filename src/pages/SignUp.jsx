import React, {useState} from 'react';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {Link} from 'react-router-dom';
import OAuth from '../components/OAuth';
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import {useNavigate} from 'react-router-dom';
import {toast } from 'react-toastify';


import {db} from '../firebase'

function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  });

  const {name, email, password} = formData;
  const navigate = useNavigate();

  const onChange = (e) =>{
    e.preventDefault();
    setFormData((prevState)=>({
      ...prevState, 
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(e){
    e.preventDefault();
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser,{
        displayName:name
      })
      const user = userCredential.user
      const formDataCopy = {...formData}
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy)
      toast.success("Sign up was successful")
      navigate("/")

    } catch (error) {
      toast.error("Something went wrong with the registration")
      
    }
  }




  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>

      {/*Top div */}
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl
       max-auto">

      {/*The div that control the image */}
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="https://images.unsplash.com/photo-1553991562-9f24b119ff51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1039&q=80" alt="key" 
            className="w-fall rounded-2xl"
          />
        </div>
        {/*End the div that control the image */}

        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">

        {/*Form validation */}
          <form onSubmit={onSubmit}>
          <input 
                type="text" 
                id="name" 
                value={name} 
                placeholder="Full name"
                onChange={onChange}
                className="mb-6 w-full px-4 py-2 text-xl text-grey-700
                bg-white border-gray-300 rounded transition ease-in-out" 
            />
            <input 
                type="email" 
                id="email" 
                value={email} 
                placeholder="Email address"
                onChange={onChange}
                className="mb-6 w-full px-4 py-2 text-xl text-grey-700
                bg-white border-gray-300 rounded transition ease-in-out" 
            />

              <div className="relative mb-6">
                    <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    value={password} 
                    placeholder="Enter your password"
                    onChange={onChange}
                    className="w-full px-4 py-2 text-xl text-grey-700
                    bg-white border-gray-300 rounded transition ease-in-out" 
                    />
                    {showPassword ? (
                      <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer"
                        onClick={()=> setShowPassword((prevState)=> !prevState)}
                      />
                    ): (
                      <AiFillEye  className="absolute right-3 top-3 text-xl cursor-pointer"
                      onClick={()=> setShowPassword((prevState)=> !prevState)}
                    />
              )}
              </div>

              <div className="flex justify-between whitespace-nowrap 
              text-sm sm:text-lg">
                <p className="mb-6">
                Have an account?
                <Link to='/sign-in'
                className='text-blue-600 hover:text-red-700
                transition duration-200 ease-in-out
                ml-1'>Sign In</Link>
              </p>
              <p>
                <Link to='/forgot-password'
                className='text-black-800 hover:text-red-700
                transition duration-200 ease-in-out'
                >Forgot Password</Link>
              </p>

              </div>
              {/*End of the form */}

                  {/*Submit button */}
                <button type="submit"
                className="w-full bg-blue-600 text-white px-7 py-3
                text-sm font-medium uppercase rounded shadow-md 
                hover:bg-blue-700 transition duration-150 ease-in-out
                hover:shadow-lg active:bg-blue-800" >
                Sing Up
                </button>
                <div className="flex items-center my-4 before:border-t before:flex-1
                before:border-gray-300
                after:border-t after:flex-1
                after:border-gray-300
                ">
                  <p className='text-center font-semibold mx-4'>OR</p>
                </div>
                <OAuth />
          </form>



        </div>
      </div>
      
    </section>
  )
}

export default SignUp