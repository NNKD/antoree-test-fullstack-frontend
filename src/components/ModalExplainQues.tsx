

export default function ModalExplainQues({question, answer, explain, onClose}: {question: string, answer:{key: string, text: string}, explain: string, onClose: () => void}) {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white max-w-[90vw] max-h-[80vh] overflow-y-auto p-8 rounded shadow-[0_0_3px_2px_#bbb]">
                <h1 className="text-2xl 2xl:text-4xl text-green-400 font-bold text-center">Explain Question</h1>
                <p className="text-base my-4"><b>Question:</b> {question}.</p>
                <p className="text-base my-4"><b>Answers:</b> {answer.key}. {answer.text}</p>
                <p className="text-base my-4"><b>Explain:</b> {explain}</p>
                <div className="mx-auto mt-6 md:mt-8 lg:mt-6 2xl:mt-8 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl
                                bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500 hover:shadow-[0_0_3px_2px_#ccc]"
                     onClick={() => onClose()}>
                    Close
                </div>
            </div>
        </div>
    )
}