import {IoClose} from "react-icons/io5";
import {FaShare} from "react-icons/fa";
import {AiFillDislike, AiFillLike} from "react-icons/ai";
import type {CommentsDTO, QuestionDTO} from "../dtos/question-dto.ts";
import type {UserDTO} from "../dtos/user-dto.ts";
import {IoMdSend} from "react-icons/io";
import {useEffect, useState} from "react";
import {addComment, getQuestionComment, getUserById, updateCommentDisLikes, updateCommentLikes} from "../utils/api.ts";
import {getUserId} from "../utils/localStorage.ts";

export default function ModalComment({question, onShare, setType, setMessage, onClose}: {question: QuestionDTO | null, onShare: () => void, setType: (status: string) => void, setMessage: (message: string) => void, onClose: () => void}) {
    const [commentContent, setCommentContent] = useState("")
    const [comments, setComments] = useState<CommentsDTO[]>([])
    const [users, setUsers] = useState<UserDTO[]>([])
    const userId = getUserId() || "";

    useEffect(() => {
        handleGetComments()
    }, [question])

    const handleGetComments = async () => {
        const result = await getQuestionComment(question?._id || "");

        if (result?.status == 'success') {
            setComments(result?.data)
            console.log(result)
            const allUserIds: string[] = result?.data.flatMap((comment: CommentsDTO) => [
                comment.author,
                ...comment.likes,
                ...comment.dislikes
            ]);

            const uniqueUserIds = [...new Set(allUserIds)];

            const usersData: (UserDTO | undefined)[] = await Promise.all(
                uniqueUserIds.map(async (id: string) => {
                    const userResult = await getUserById(id);
                    if (userResult?.status === 'success' && userResult.data) {
                        return userResult.data as UserDTO;
                    }
                    return undefined;
                })
            );

            setUsers(usersData.filter((u): u is UserDTO => !!u));

        }else  {
            setType("error");
            setMessage(result?.message);
            if (result?.statusCode == 401) {
                onClose()
            }
        }

    }

    const handleSendComment = async () => {
        const createCommentDTO = {
            author: userId,
            questionId: question?._id || "",
            content: commentContent,
            likes: [],
            dislikes: [],
        }
        const result = await addComment(createCommentDTO);

        if (result?.status == 'success') {
            setCommentContent("");
            handleGetComments();
        }else  {
            setType("error");
            setMessage(result?.message);
            if (result?.statusCode == 401) {
                onClose()
            }
        }
    }

    const handleLikeComment = async (id: string) => {

        const result = await updateCommentLikes(id);

        if (result?.status == 'success') {
            handleGetComments()
        }else  {
            setType("error");
            setMessage(result?.message);
            if (result?.statusCode == 401) {
                onClose()
            }
        }
    }

    const handleDisLikeComment = async (id: string) => {

        const result = await updateCommentDisLikes(id);

        if (result?.status == 'success') {
            handleGetComments()
        }else  {
            setType("error");
            setMessage(result?.message);
            if (result?.statusCode == 401) {
                onClose()
            }
        }
    }



    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="relative bg-white w-fit p-4 pb-0 text-center rounded min-w-[50vw] min-h-[50vh] max-h-[80vh] max-w-[85vw] overflow-y-auto">
                <h1 className="text-2xl 2xl:text-4xl text-green-400 font-bold">Question</h1>
                <div className="absolute top-0 right-0 p-2
                                hover:opacity-50 hover:cursor-pointer transition-all ease-in-out" onClick={() => onClose()}>
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

                {comments.length > 0 ? (
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
                                        <div className="text-base flex items-center gap-1 cursor-pointer">
                                            <div>
                                                {comment.likes.length}
                                            </div>
                                            <div onClick={() => handleLikeComment(comment._id)}>
                                                <AiFillLike className={`${comment.likes.includes(userId) ? "text-green-400" : ""}`}/>
                                            </div>
                                        </div>
                                        <div className="text-base flex items-center gap-1 cursor-pointer">
                                            <div>
                                                {comment.dislikes.length}
                                            </div>
                                            <div onClick={() => handleDisLikeComment(comment._id)}>
                                                <AiFillDislike className={`${comment.dislikes.includes(userId) ? "text-green-400" : ""}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : ""}


                <div className="sticky bottom-0 left-0 right-0 border-t-2 h-30 bg-white p-4">
                    <div className="flex flex-col rounded border-2 p-2 focus-within:border-green-400">
                        <textarea placeholder="..." className="w-full resize-none p-2 outline-none" value={commentContent} onChange={(e)=> setCommentContent(e.target.value)}></textarea>
                        <div className={`ml-auto ${commentContent.length > 0 ? "cursor-pointer" : "pointer-events-none"}`} onClick={handleSendComment}>
                            <IoMdSend className={`text-xl ${commentContent.length > 0 ? "text-green-400" : "text-gray-400"}`}/>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}