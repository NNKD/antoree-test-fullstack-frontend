export interface QuestionDTO {
    _id?: string;
    question: string;
    options: {key: string, text: string}[];
    answer: {key: string, text: string};
    explain: string;
}