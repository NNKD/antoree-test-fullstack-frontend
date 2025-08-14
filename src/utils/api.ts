import axios from "axios";
import {env} from "../config/env.ts";
import type {UserLoginDTO, UserRegisterDTO, UserUpdateNameDTO} from "../dtos/user-dto.ts";
import {getToken, getUserId} from "./localStorage.ts";
import type {CreateCommentsDTO} from "../dtos/question-dto.ts";

function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? 'No message from server';
    }
    return 'Unknown error';
}

export const sendMailVerificationCode = async (email: string) => {
    try {
        const response = await axios.post(`${env.API_URL}/mails/send-code`, {
            email,
        },)

        console.log(response);
        if (response.data.statusCode == 200 && response.data.status == 'Success') {
            return {status: 'success', message: response.data.message};
        }

    }catch (error: unknown) {
        console.log(error)
        return {status: 'error', message: getErrorMessage(error)};
    }
}

export const register = async (userRegisterDTO: UserRegisterDTO) => {
    try {
        const response = await axios.post(`${env.API_URL}/users/register`, userRegisterDTO)

        if (response.data.statusCode == 200 && response.data.status == 'Success') {
            return {status: 'success', message: response.data.message};
        }

    }catch (error: unknown) {
        console.log(error)
        return {status: 'error', message: getErrorMessage(error)};
    }
}

export const login = async (userLoginDTO: UserLoginDTO) => {
    try {
        const response = await axios.post(`${env.API_URL}/auth/login`, userLoginDTO)

        if (response.data.statusCode == 200 && response.data.status == 'Success') {
            return {data: response.data.data, status: 'success', message: response.data.message};
        }

    }catch (error: unknown) {
        console.log(error)
        return {status: 'error', message: getErrorMessage(error)};
    }
}

export const updateName = async (id: string, userUpdateNameDTO: UserUpdateNameDTO) => {
    try {
        const response = await axios.patch(`${env.API_URL}/users/${id}`, userUpdateNameDTO)

        if (response.data.statusCode == 200 && response.data.status == 'Success') {
            return {data: response.data.data, status: 'success', message: response.data.message};
        }

    }catch (error: unknown) {
        console.log(error)
        return {status: 'error', message: getErrorMessage(error)};
    }
}

export const getRandomQuestion = async () => {
    try {
        const response = await axios.get(`${env.API_URL}/questions/random`)

        if (response.data.statusCode == 200 && response.data.status == 'Success') {
            return {data: response.data.data, status: 'success', message: response.data.message};
        }

    }catch (error: unknown) {
        console.log(error)
        return {status: 'error', message: getErrorMessage(error)};
    }
}

export const getQuestionComment = async (questionId:string) => {
    try {
        const token = getToken();
        const response = await axios.get(`${env.API_URL}/comments/question/${questionId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })

        if (response.data.statusCode == 200 && response.data.status == 'Success') {
            return {data: response.data.data, status: 'success', message: response.data.message};
        }

    }catch (error: unknown) {
        console.log(error)
        return {status: 'error', message: getErrorMessage(error)};
    }
}

export const addComment = async (createCommentsDTO: CreateCommentsDTO) => {
    try {
        console.log(createCommentsDTO)
        const token = getToken();
        const response = await axios.post(`${env.API_URL}/comments`,createCommentsDTO,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })

        if (response.data.statusCode == 200 && response.data.status == 'Success') {
            return {data: response.data.data, status: 'success', message: response.data.message};
        }

    }catch (error: unknown) {
        console.log(error)
        return {status: 'error', message: getErrorMessage(error)};
    }
}

export const updateCommentLikes = async (questionId: string) => {
    try {
        const userId = getUserId();
        const token = getToken();
        const response = await axios.patch(`${env.API_URL}/comments/${questionId}/likes/${userId}`,{},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })

        if (response.data.statusCode == 200 && response.data.status == 'Success') {
            return {status: 'success', message: response.data.message};
        }

    }catch (error: unknown) {
        console.log(error)
        return {status: 'error', message: getErrorMessage(error)};
    }
}

export const updateCommentDisLikes = async (questionId: string) => {
    try {
        const userId = getUserId();
        const token = getToken();
        const response = await axios.patch(`${env.API_URL}/comments/${questionId}/dislikes/${userId}`, {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })

        if (response.data.statusCode == 200 && response.data.status == 'Success') {
            return {status: 'success', message: response.data.message};
        }

    }catch (error: unknown) {
        console.log(error)
        return {status: 'error', message: getErrorMessage(error)};
    }
}

export const getUserById = async (id: string) => {
    try {
        const response = await axios.get(`${env.API_URL}/users/${id}`)
        if (response.data.statusCode == 200 && response.data.status == 'Success') {
            console.log(response.data.data)
            return { data: response.data.data, status: 'success', message: response.data.message };
        }

    }catch (error: unknown) {
        console.log(error)
        return {status: 'error', message: getErrorMessage(error)};
    }
}
