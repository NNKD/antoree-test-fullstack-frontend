import {FaEnvelope, FaLock} from "react-icons/fa6";
import {Link} from "react-router-dom";

export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md p-10 mx-auto rounded border-2 border-gray-300 shadow-[0_0_3px_2px_#ddd]">
                <p className="text-center text-2xl text-green-400 font-bold">Sign in</p>
                <p className="text-center text-base text-gray-500 my-4">Welcome back! Ready to learn?</p>
                <div className="group flex items-center my-8 border-2 border-gray-300 rounded focus-within:border-green-400">
                    <FaEnvelope className="w-1/5 text-gray-300 group-focus-within:text-green-400" />
                    <input type="email" name="email" placeholder="Email" className="rounded bg-transparent outline-none p-2 w-full"/>
                </div>
                <div className="group flex items-center my-8 border-2 border-gray-300 rounded focus-within:border-green-400">
                    <FaLock className="w-1/5 text-gray-300 group-focus-within:text-green-400"/>
                    <input type="password" name="password" placeholder="Password" className="rounded bg-transparent outline-none p-2 w-full"/>
                </div>

                <div className="mx-auto my-4 w-fit bg-green-400 py-2 px-4 rounded font-bold text-white text-base
                                transition-all ease-in-out cursor-pointer hover:bg-green-500 hover:shadow-[0_0_3px_2px_#ccc]">
                    Sign in
                </div>

                <Link
                    to="/register"
                    className="block ml-auto w-fit text-base text-blue-600 hover:underline hover:text-blue-800 transition-all ease-in-out">
                    Don't have an account? Sign up now
                </Link>


            </div>
        </div>
    )
}