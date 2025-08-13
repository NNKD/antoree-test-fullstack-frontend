import {useState} from "react";
import ModalExplainQues from "../components/ModalExplainQues.tsx";

export default function Home() {
    const [selectedKey, setSelectedKey] = useState("");
    const [checked, setChecked] = useState(false);
    const [showExplain, setShowExplain] = useState(false);

    const question = {
        question: 'By the time she arrives, we ________ dinner',
        options: [
            {key: 'A', text: 'finish'},
            {key: 'B', text: 'will finish'},
            {key: 'C', text: 'will have finished'},
            {key: 'D', text: 'finished'},
        ],
        answer: {key: 'C', text: 'will have finished'},
        explain: 'Câu này dùng thì Future Perfect (tương lai hoàn thành) để diễn tả một hành động sẽ hoàn thành trước một thời điểm tương lai khác.'
    }

    const handleCheckAnswer = (key: string) => {
        setSelectedKey(key)
        setChecked(true)
    }

    const handleShowAnswer = () => {
        setSelectedKey(question.answer.key)
        setChecked(true)
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="border-2 w-fit p-6 rounded max-h-[80vh] max-w-[95vw] overflow-y-auto">
                <p className="text-xl md:text-2xl lg:text-xl 2xl:text-2xl"><b>Question</b>: {question.question}.</p>
                <div className="my-4">
                    {question.options.map((option) => (
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
                <div className="flex items-center justify-between">
                    <div className={`my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl                 
                                     ${checked ? "bg-gray-400 text-gray-500" : "bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500  hover:shadow-[0_0_3px_2px_#ccc]"}`}
                    onClick={handleShowAnswer}>
                        Answer
                    </div>
                    <div className="my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl
                                     bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500  hover:shadow-[0_0_3px_2px_#ccc]"
                            onClick={() => setShowExplain(!showExplain)}>
                        Explain
                    </div>
                </div>
                <div className="mx-auto my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl
                                bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500  hover:shadow-[0_0_3px_2px_#ccc]">
                    Next
                </div>
            </div>

            {showExplain ? (
                <ModalExplainQues question={question.question} answer={question.answer} explain={question.explain} onClose={() => setShowExplain(!showExplain)}/>
            ) : ""}

        </div>
    )
}