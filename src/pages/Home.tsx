import {Link} from "react-router-dom";
import {getRandomQuestion} from "../utils/api.ts";
import {useEffect, useState} from "react";

export default function Home() {
    const [id, setId] = useState("")

    useEffect(() => {
        handleGetRandomQuestion()
    }, [])

    const handleGetRandomQuestion = async () => {
        const result = await getRandomQuestion()
        if (result?.status == "success") {
            setId(result?.data._id)
        }
    }

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <Link to={`/questions/${id}`} className="mx-auto my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl select-none
                                     bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500  hover:shadow-[0_0_3px_2px_#ccc]">
                Ready to Learn English
            </Link>
        </div>
    )
}