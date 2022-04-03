import { PredictionResponse } from "./service-types";

export interface LoginFormProperties{
    username: string,
    password: string,
    usernameSetter: (value:string) => void,
    passwordSetter: (value:string) => void,
}

export interface SignUpFormProperties{
    username: string,
    password: string,
    email: string,
    usernameSetter: (value:string) => void,
    passwordSetter: (value:string) => void,
    emailSetter: (value:string) => void,
}