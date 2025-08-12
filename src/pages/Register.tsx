import {FaEnvelope, FaLock} from "react-icons/fa6";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {register, sendMailVerificationCode} from "../utils/api.ts";
import NoticeUI from "../components/NoticeUI.tsx";
import type {UserRegisterDTO} from "../dtos/user-dto.ts";

export default function Register() {
    const [timeLeft, setTimeLeft] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [code, setCode] = useState("")
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const [loading, setLoading] = useState(false)

    // handle countdown time
    useEffect(() => {
        if (timeLeft == 0) return

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)

        return () => clearTimeout(timer)

    }, [timeLeft])

    const handleSendCode = async () => {
        if (timeLeft == 0) {
            setTimeLeft(60)
            if (email == "") {
                setType("warning")
                setMessage("Email cannot be empty")
                return;
            }
            const result = await sendMailVerificationCode(email)
            setType(result?.status || "info")
            setMessage(result?.message)
        }
    }

    const handleRegister = async () => {
        setLoading(true)
        if (password !== confirmPassword) {
            setType("error")
            setMessage("Passwords don't match")
            setLoading(false)
        }else {
            const userRegisterDTO: UserRegisterDTO = {
                email,
                password,
                code,
            }
            const result = await register(userRegisterDTO);
            setType(result?.status || "info")
            setMessage(result?.message)
            setLoading(false)
        }
    }



    return (
        <div className="flex items-center justify-center h-screen">
            <div className="md:w-3/4 lg:w-1/3 p-4 md:p-10 mx-auto rounded border-2 border-gray-300 shadow-[0_0_3px_2px_#ddd]">
                <p className="text-center text-2xl md:text-4xl lg:text-2xl 2xl:text-4xl text-green-400 font-bold">Sign up</p>
                <p className="text-center text-base md:text-2xl lg:text-base 2xl:text-2xl text-gray-500 mt-2 mb-4">Create an account and start learning</p>
                <div className="group flex items-center border-2 border-gray-300 rounded focus-within:border-green-400">
                    <FaEnvelope className="w-1/5 md:text-2xl lg:text-base 2xl:text-2xl text-gray-300 group-focus-within:text-green-400" />
                    <input type="email" name="email" placeholder="Email" disabled={loading} className="rounded bg-transparent outline-none p-2 md:p-4 lg:p-2 2xl:p-4 w-full md:text-2xl lg:text-base 2xl:text-2xl"
                    value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="group flex justify-between my-6 md:my-8 lg:my-6 2xl:my-8 border-2 border-gray-300 rounded focus-within:border-green-400">
                    <input type="text" name="code" placeholder="Code" disabled={loading} className="rounded bg-transparent outline-none p-2 md:p-4 lg:p-2 2xl:p-4 md:text-2xl lg:text-base 2xl:text-2xl"
                    value={code} onChange={e => setCode(e.target.value)} />
                    <div className={`min-w-[120px] flex items-center justify-center font-bold px-4
                                    ${timeLeft == 0 ? "bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500 hover:shadow-[0_0_3px_2px_#ccc]" : "pointer-events-none bg-gray-300 text-gray-400"} }`}
                        onClick={handleSendCode}>
                        {timeLeft == 0 ? "Send Code" : `${timeLeft}`}
                    </div>
                </div>

                <div className="group flex items-center my-6 md:my-8 lg:my-6 2xl:my-8 border-2 border-gray-300 rounded focus-within:border-green-400">
                    <FaLock className="w-1/5 md:text-2xl lg:text-base 2xl:text-2xl text-gray-300 group-focus-within:text-green-400"/>
                    <input type="password" name="password" placeholder="Password" disabled={loading} className="rounded bg-transparent outline-none p-2 md:p-4 lg:p-2 2xl:p-4 w-full md:text-2xl lg:text-base 2xl:text-2xl"
                    value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <div className="group flex items-center border-2 border-gray-300 rounded focus-within:border-green-400">
                    <FaLock className="w-1/5 md:text-2xl lg:text-base 2xl:text-2xl text-gray-300 group-focus-within:text-green-400"/>
                    <input type="password" name="confirm-password" placeholder="Confirm Password" disabled={loading} className="rounded bg-transparent outline-none p-2 md:p-4 lg:p-2 2xl:p-4 w-full md:text-2xl lg:text-base 2xl:text-2xl"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>

                <div className={`mx-auto my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl                                
                                ${loading ? "pointer-events-none bg-gray-300 text-gray-400" : "bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500 hover:shadow-[0_0_3px_2px_#ccc]"}`}
                    onClick={handleRegister}>
                    {loading ? 'Loading...' : 'Sign up'}
                </div>

                <Link
                    to="/login"
                    className="block ml-auto w-fit text-base md:text-2xl lg:text-base 2xl:text-2xl text-blue-600 hover:underline hover:text-blue-800 transition-all ease-in-out">
                    Already have an account? Sign in now
                </Link>


            </div>

            <NoticeUI mess={message} type={type} />

        </div>
    )
}