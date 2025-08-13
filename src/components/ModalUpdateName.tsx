import {useState} from "react";
import type {UserUpdateNameDTO} from "../dtos/user-dto.ts";
import {updateName} from "../utils/api.ts";

export default function ModalUpdateName({email, userId, setMessage, setCode, setType} : {email: string, userId: string, setMessage: (mess: string) => void, setType: (status: string) => void, setCode: (code: string) => void}) {
    const [name, setName] = useState("")
    const [loadingUpdateName, setLoadingUpdateName] = useState(false)

    const handleUpdateName = async () => {
        setLoadingUpdateName(true)
        const userUpdateNameDTO: UserUpdateNameDTO = {
            email,
            name,
        }
        const result = await updateName(userId, userUpdateNameDTO);
        setCode(result?.data.code)
        setType(result?.status || "info")
        setMessage(result?.message)
        setLoadingUpdateName(false)
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-fit p-8 text-center rounded shadow-[0_0_3px_2px_#bbb]">
                <h1 className="text-2xl 2xl:text-4xl text-green-400 font-bold">Your Name</h1>
                <p className="text-base 2xl:text-2xl text-gray-500 mt-4 mb-10">Enter your name to finish</p>
                <div className="group flex items-center border-2 border-gray-300 rounded focus-within:border-green-400">
                    <input type="text" name="name" placeholder="Your name" disabled={loadingUpdateName} className="rounded bg-transparent outline-none p-2 md:p-4 lg:p-2 2xl:p-4 w-full md:text-2xl lg:text-base 2xl:text-2xl"
                           value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className={`mx-auto mt-6 md:mt-8 lg:mt-6 2xl:mt-8 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl                                
                                ${loadingUpdateName ? "pointer-events-none bg-gray-300 text-gray-400" : "bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500 hover:shadow-[0_0_3px_2px_#ccc]"}`}
                     onClick={handleUpdateName}>
                    {loadingUpdateName ? 'Loading...' : 'Continue'}
                </div>
            </div>
        </div>
    )
}