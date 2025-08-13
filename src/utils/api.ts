import axios from "axios";
import {env} from "../config/env.ts";
import type {UserLoginDTO, UserRegisterDTO, UserUpdateNameDTO} from "../dtos/user-dto.ts";

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