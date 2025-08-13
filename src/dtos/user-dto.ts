export interface UserRegisterDTO {
    email: string;
    password: string;
    code: string;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}

export interface UserUpdateNameDTO {
    email: string;
    name: string;
}