import {IoClose} from "react-icons/io5";
import {FaShare} from "react-icons/fa";
import {AiFillDislike, AiFillLike} from "react-icons/ai";
import type {CommentsDTO, QuestionDTO} from "../dtos/question-dto.ts";
import {useState} from "react";
import type {UserDTO} from "../dtos/user-dto.ts";

export default function ModalComment({question, onShare}: {question: QuestionDTO, onShare: () => void }) {
    const [comments, setComments] = useState<CommentsDTO[]>([])
    const [users, setUsers] = useState<UserDTO[]>([])
    const userId = "";

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="relative bg-white w-fit p-4 text-center rounded max-h-[80vh] max-w-[85vw] overflow-y-auto">
                <h1 className="text-2xl 2xl:text-4xl text-green-400 font-bold">Question</h1>
                <div className="absolute top-0 right-0 p-2
                                hover:opacity-50 hover:cursor-pointer transition-all ease-in-out">
                    <IoClose className="text-2xl"/>
                </div>

                <div className="mx-auto border-2 w-fit p-6 rounded mt-4">
                    <p className="text-xl md:text-2xl lg:text-xl 2xl:text-2xl"><b>Question</b>: {question?.question}</p>
                    <div className="my-4">
                        {question?.options.map((option) => (
                            <div key={option.key} className={`my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl
                                     border-green-400 text-black transition-all ease-in-out cursor-pointer hover:bg-green-500 hover:text-white hover:shadow-[0_0_3px_2px_#ccc] pointer-events-none
                                     ${option.key == question.answer.key ? "bg-green-400 text-white" : ""}`}>

                                {option.key}. {option.text}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ml-auto my-4 md:my-6 lg:my-4 2xl:my-6 w-fit py-2 md:py-4 lg:py-2 2xl:py-4 px-4 md:px-8 lg:px-4 2xl:px-8 rounded font-bold text-base md:text-2xl lg:text-base 2xl:text-2xl select-none
                                     bg-green-400 text-white transition-all ease-in-out cursor-pointer hover:bg-green-500  hover:shadow-[0_0_3px_2px_#ccc]"
                     onClick={() => onShare}>
                    <FaShare/>
                </div>

                <div className="border-t-2 py-4">
                    {comments.map((comment) => (
                        <div className="relative flex items-start gap-2 mb-4">
                            <img src={users.find(u => u._id == comment.author)?.avatar} alt="avatar" className="rounded-full w-8" />
                            <div className="flex flex-col gap-2 w-full max-w-[60vw]">
                                <div className="bg-gray-200 rounded-xl p-2 text-left break-words">
                                    <div><b>{users.find(u => u._id == comment.author)?.name}</b></div>
                                    <p>{comment.content}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-base flex items-center gap-1">
                                        <div>
                                            {comment.likes.length}
                                        </div>
                                        <AiFillLike className={`${users.some(u => u._id == userId) ? "text-green-400" : ""}`}/>
                                    </div>
                                    <div className="text-base flex items-center gap-1">
                                        <div>
                                            {comment.dislikes.length}
                                        </div>
                                        <AiFillDislike className={`${users.some(u => u._id == userId) ? "text-green-400" : ""}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}



                </div>


            </div>
        </div>
    )
}