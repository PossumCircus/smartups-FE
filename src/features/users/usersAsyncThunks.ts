import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosRequestConfig } from "axios"
import { UserDataType, LoginFormDataType } from "../../types/usersType";

interface LoginArgsDataType {
    loginData: {
        email: string
        password: string
    }
    config?: AxiosRequestConfig
}

export const userLogin = createAsyncThunk<UserDataType, LoginArgsDataType>(
    "users/userLogin",
    async ({ loginData, config }) => {
        const { data } = await axios.post(`${process.env.REACT_APP_AUTH_API_URL}/login`, loginData, {
            headers: {
                "Content-Type": "application/json",
            },
            ...config,
        });
        if (!data) {
            throw new Error("Failed to 'login' no response.");
        }
        return data;
    }
);