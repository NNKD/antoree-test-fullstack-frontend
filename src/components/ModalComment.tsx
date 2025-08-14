import {IoClose} from "react-icons/io5";
import {FaShare} from "react-icons/fa";
import {AiFillDislike, AiFillLike} from "react-icons/ai";
import type {CommentsDTO, QuestionDTO} from "../dtos/question-dto.ts";
import type {UserDTO} from "../dtos/user-dto.ts";
import {IoMdSend} from "react-icons/io";
import {useState} from "react";

// export default function ModalComment({question, onShare}: {question: QuestionDTO, onShare: () => void }) {
export default function ModalComment({onShare}: {onShare: () => void }) {
    const userId = "u1";
    const [commentContent, setCommentContent] = useState("")

    const question: QuestionDTO = {
        _id: "q1",
        question: "What is 2 + 2?",
        options: [
            { key: "A", text: "3" },
            { key: "B", text: "4" },
            { key: "C", text: "5" },
            { key: "D", text: "22" },
        ],
        answer: { key: "B", text: "4" },
        explain: "2 + 2 equals 4.",
    };

    const users: UserDTO[] = [
        { _id: "u1", name: "Alice", email: "alice@example.com", avatar: "https://i.pravatar.cc/40?img=1" },
        { _id: "u2", name: "Bob", email: "bob@example.com", avatar: "https://i.pravatar.cc/40?img=2" },
        { _id: "u3", name: "Charlie", email: "charlie@example.com", avatar: "https://i.pravatar.cc/40?img=3" },
    ];


    const comments: CommentsDTO[] = [
        {
            _id: "c1",
            author: "u1",
            questionId: "q1",
            content: "I think the answer is B.",
            likes: ["u2", "u3"],
            dislikes: [],
        },
        {
            _id: "c2",
            author: "u2",
            questionId: "q1",
            content: "Definitely 4!",
            likes: ["u1"],
            dislikes: ["u3"],
        },
        {
            _id: "c3",
            author: "u3",
            questionId: "q1",
            content: "Are you sure it's not 22?",
            likes: [],
            dislikes: ["u1", "u2"],
        },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="relative bg-white w-fit p-4 pb-0 text-center rounded min-w-[50vw] min-h-[50vh] max-h-[80vh] max-w-[85vw] overflow-y-auto">
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

                <div className="flex-1 border-t-2 py-4">
                    {comments.map((comment) => (
                        <div className="relative flex items-start gap-2 mb-4">
                            <img src={users.find(u => u._id == comment.author)?.avatar} alt="avatar" className="rounded-full w-8" />
                            <div className="flex flex-col gap-2 w-fit max-w-[60vw]">
                                <div className="bg-gray-200 rounded-xl p-2 text-left break-words">
                                    <div><b>{users.find(u => u._id == comment.author)?.name}</b></div>
                                    <p>{comment.content}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-base flex items-center gap-1">
                                        <div>
                                            {comment.likes.length}
                                        </div>
                                        <AiFillLike className={`${comment.likes.includes(userId) ? "text-green-400" : ""}`}/>
                                    </div>
                                    <div className="text-base flex items-center gap-1">
                                        <div>
                                            {comment.dislikes.length}
                                        </div>
                                        <AiFillDislike className={`${comment.dislikes.includes(userId) ? "text-green-400" : ""}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sticky bottom-0 left-0 right-0 border-t-2 h-30 bg-white p-4">
                    <div className="flex flex-col rounded border-2 p-2 focus-within:border-green-400">
                        <textarea placeholder="..." className="w-full resize-none p-2 outline-none" onChange={(e)=> setCommentContent(e.target.value)}></textarea>
                        <div className={`ml-auto ${commentContent.length > 0 ? "cursor-pointer" : "pointer-events-none"}`}>
                            <IoMdSend className={`text-xl ${commentContent.length > 0 ? "text-green-400" : "text-gray-400"}`}/>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}