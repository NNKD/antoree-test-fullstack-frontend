export interface QuestionDTO {
    _id?: string;
    question: string;
    options: {key: string, text: string}[];
    answer: {key: string, text: string};
    explain: string;
}

export interface CommentsDTO {
    _id: string;
    author: string;
    content: string;
    likes: string[];
    dislikes: string[];
};

