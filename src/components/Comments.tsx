import { AiFillDislike, AiFillLike } from "react-icons/ai";
import type {CommentType} from "../dtos/question-dto.ts";

export default function Comments({ comment, indent = 0 }: { comment: CommentType; indent?: number }) {
    const maxWidth = `calc(60vw - ${indent * 2}rem - 32px)`;

    return (
        <div className="flex flex-col gap-2 mb-4" style={{ marginLeft: indent * 2 + "rem" }}>
            {/* Comment cha */}
            <div className="flex items-start gap-2">
                <img src={comment.author.avatar} alt="avatar" className="w-8 rounded-full" />
                <div className="bg-gray-200 p-2 rounded-xl break-words text-left" style={{ maxWidth }}>
                    <b>{comment.author.name}</b>
                    <p>{comment.content}</p>
                </div>
            </div>

            {/* Like / Dislike / Reply */}
            <div className="flex items-center gap-4 text-sm pl-3">
                <div className="flex items-center gap-1">{comment.likes} <AiFillLike /></div>
                <div className="flex items-center gap-1">0 <AiFillDislike /></div>
                <div>Reply</div>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-4 pl-4 border-l-2 border-gray-300">
                    {comment.replies.map(rep => (
                        <Comments key={rep._id} comment={rep} indent={indent + 1} />
                    ))}
                </div>
            )}
        </div>
    )
}
