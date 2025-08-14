import {FaEnvelope, FaLock} from "react-icons/fa6";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {login} from "../utils/api.ts";
import type {UserLoginDTO} from "../dtos/user-dto.ts";
import NoticeUI from "../components/NoticeUI.tsx";
import ModalUpdateName from "../components/ModalUpdateName.tsx";
import {saveToken, saveUserId} from "../utils/localStorage.ts";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState("")
    const [code, setCode] = useState("")
    const [token, setToken] = useState("")
    const [enableModal, setEnableModal] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true)
        const userLogin: UserLoginDTO = {
            email,
            password,
        }
        const result = await login(userLogin)
        setType(result?.status || "info")
        setMessage(result?.message)
        if (result?.status == "success") {
            setUserId(result?.data.id)
            setCode(result?.data.code)
            setToken(result?.data.token)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (code != "" && code == "UPDATE") {
            setEnableModal(true)
            return;
        }

        if (code != "" && code == "ACTIVED") {
            saveToken(token)
            saveUserId(userId)
            navigate("/")
            return;
        }

    }, [code])

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="md:w-3/4 lg:w-1/3 p-10 mx-auto rounded border-2 border-gray-300 shadow-[0_0_3px_2px_#ddd]">
                <p className="text-center text-2xl md:text-4xl lg:text-2xl 2xl:text-4xl text-green-400 font-bold">Sign in</p>
                <p className="text-center text-base md:text-2xl lg:text-base 2xl:text-2xl text-gray-500 my-4 2xl:my-6">Welcome back! Ready to learn?</p>
                <div className="group flex items-center my-8 md:my-10 lg:my-8 2xl:my-10 border-2 border-gray-300 rounded focus-within:border-green-400">
                    <FaEnvelope className="w-1/5 md:text-2xl lg:text-base 2xl:text-2xl text-gray-300 group-focus-within:text-green-400" />
                    <input type="email" name="email" placeholder="Email" disabled={loading} className="rounded bg-transparent outline-none p-2 md:p-4 lg:p-2 2xl:p-4 w-full md:text-2xl lg:text-base 2xl:text-2xl"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="group flex items-center my-8 2xl:my-10 border-2 border-gray-300 rounded focus-within:border-green-400">
                    <FaLock className="w-1/5 md:text-2xl lg:text-base 2xl:text-2xl text-gray-300 group-focus-within:text-green-400"/>
                    <input type="password" name="password" placeholder="Password" disabled={loading} className="rounded bg-transparent outline-none p-2 md:p-4 lg:p-2 2xl:p-4 w-full md:text-2xl lg:text-base 2xl:text-2xl"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className={`mx-auto my-4 md:my-6 lg:my-4 2xl:my-6 w-fit  py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl select-none                
                                ${loading ? "pointer-events-none bg-gray-300 text-gray-400" : "bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500 hover:shadow-[0_0_3px_2px_#ccc]"}`}
                onClick={handleLogin}>
                    {loading ? "Loading..." : "Sign in"}
                </div>

                <Link
                    to="/register"
                    className="block ml-auto w-fit text-base md:text-2xl lg:text-base 2xl:text-2xl text-blue-600 hover:underline hover:text-blue-800 transition-all ease-in-out">
                    Don't have an account? Sign up now
                </Link>
            </div>

            {enableModal ? (
                <ModalUpdateName email={email} userId={userId} setCode={setCode} setMessage={setMessage} setType={setType}/>
            ) : ""}

            <NoticeUI mess={message} type={type} />
        </div>
    )
}