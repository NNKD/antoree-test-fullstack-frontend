import {useEffect, useState} from "react";
import ModalExplainQues from "../components/ModalExplainQues.tsx";
import {getRandomQuestion} from "../utils/api.ts";
import NoticeUI from "../components/NoticeUI.tsx";
import type {QuestionDTO} from "../dtos/question-dto.ts";
import {useNavigate} from "react-router-dom";
import {FaComment, FaShare} from "react-icons/fa";
import ModalComment from "../components/ModalComment.tsx";

export default function Home() {
    const [selectedKey, setSelectedKey] = useState("");
    const [checked, setChecked] = useState(false);
    const [showExplain, setShowExplain] = useState(false);
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const [question, setQuestion] = useState<QuestionDTO | null>(null)
    const [questID, setQuestID] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        handleGetRandomQuestion()
    }, [])

    const handleGetRandomQuestion = async () => {
        setSelectedKey("")
        setChecked(false)
        const result = await getRandomQuestion()
        if (result?.status == "success") {
            setQuestion(result?.data)
            setQuestID(result.data._id)
        }else {
            setType(result?.status || "info")
            setMessage(result?.message)
        }
    }

    const handleNextQuestion = async () => {
        await handleGetRandomQuestion()
        navigate(`/questions/${questID}`)
    }

    const handleCheckAnswer = (key: string) => {
        setSelectedKey(key)
        setChecked(true)
    }

    const handleShowAnswer = () => {
        setSelectedKey(question?.answer.key || "")
        setChecked(true)
    }

    const handleShare = () => {
        if (!questID) return;
        const url = `${window.location.origin}/questions/${questID}`;
        navigator.clipboard.writeText(url).then(() => {
            setType("success");
            setMessage("Copy to clipboard");
        }).catch(() => {
            setType("error");
            setMessage("Error occurs");
        });
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="border-2 w-fit p-6 rounded max-h-[80vh] max-w-[95vw] overflow-y-auto">
                <p className="text-xl md:text-2xl lg:text-xl 2xl:text-2xl"><b>Question</b>: {question?.question}</p>
                <div className="my-4">
                    {question?.options.map((option) => (
                        <div key={option.key} className={`my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl
                                     border-green-400 text-black transition-all ease-in-out cursor-pointer hover:bg-green-500 hover:text-white hover:shadow-[0_0_3px_2px_#ccc]
                                     ${checked ? (option.key == question.answer.key ? "bg-green-400 text-white pointer-events-none" : "pointer-events-none") : ""}
                                     ${selectedKey == option.key && selectedKey != question.answer.key ? "border-red-400 bg-red-400 text-white pointer-events-none" : "" }
                                     `}
                            onClick={() => {handleCheckAnswer(option.key)}}>

                            {option.key}. {option.text}
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap items-center justify-between">
                    <div className={`my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl select-none                 
                                     ${checked ? "bg-gray-400 text-gray-500" : "bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500  hover:shadow-[0_0_3px_2px_#ccc]"}`}
                    onClick={handleShowAnswer}>
                        Answer
                    </div>
                    <div className="my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl select-none
                                     bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500  hover:shadow-[0_0_3px_2px_#ccc]"
                            onClick={() => setShowExplain(!showExplain)}>
                        Explain
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between">
                    <div className="my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl select-none
                                     bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500  hover:shadow-[0_0_3px_2px_#ccc]">
                        <FaComment />
                    </div>
                    <div className="mx-auto my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl select-none
                                bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500  hover:shadow-[0_0_3px_2px_#ccc]"
                         onClick={handleNextQuestion}>
                        Next
                    </div>
                    <div className="my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl select-none
                                     bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500  hover:shadow-[0_0_3px_2px_#ccc]"
                        onClick={handleShare}>
                        <FaShare />
                    </div>
                </div>
            </div>

            {showExplain ? (
                <ModalExplainQues question={question?.question || ""} answer={question?.answer || {key: '', text: ''}} explain={question?.explain || ""} onClose={() => setShowExplain(!showExplain)}/>
            ) : ""}

            <ModalComment/>

            <NoticeUI mess={message} type={type} />
        </div>
    )
}