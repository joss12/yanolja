import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import OAuth from '../components/OAuth'
import {toast} from "react-toastify";
import {sendPasswordResetEmail, getAuth} from 'firebase/auth'

function ForgotPassword() {

 
  const [email, setEmail] = useState("");



  const onChange = (e) =>{
    e.preventDefault();
    setEmail( e.target.value)
  }

  const onSubmit = async (e) =>{
    e.preventDefault();
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("email was sent")
    } catch (error) {
      toast.error('Could not send reset password')
    }
  }


  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>

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
                type="email" 
                id="email" 
                value={email} 
                placeholder="Email address"
                onChange={onChange}
                className="mb-6 w-full px-4 py-2 text-xl text-grey-700
                bg-white border-gray-300 rounded transition ease-in-out" 
            />

             

              <div className="flex justify-between whitespace-nowrap 
              text-sm sm:text-lg">
                <p className="mb-6">
                Don't have an account?
                <Link to='/sign-up'
                className='text-blue-600 hover:text-red-700
                transition duration-200 ease-in-out
                ml-1'>Register</Link>
              </p>
              <p>
                <Link to='/sign-in'
                className='text-black-800 hover:text-red-700
                transition duration-200 ease-in-out'
                >Sign in instead
                </Link>
              </p>

              </div>
              {/*End of the form */}

                  {/*Submit button */}
                <button type="submit"
                className="w-full bg-blue-600 text-white px-7 py-3
                text-sm font-medium uppercase rounded shadow-md 
                hover:bg-blue-700 transition duration-150 ease-in-out
                hover:shadow-lg active:bg-blue-800" >
                
                Send reset password

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

export default ForgotPassword