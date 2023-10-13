import axios from "axios"
import { instanceWithToken } from "./profile"

export const instancOfAuth = axios.create({
    baseURL: "https://pavel-backender.org.kg/"
})



export const register = async (object) => {
    try {
        const res = await instancOfAuth.post("sign_up/", {
            email: object.email,
            username: object.name,
            password: object.password,
            password2: object.confirmPass
        })
        return res.data
    } catch (error) {
        throw error
    }
}

export const getInfoForG = async (token)=>{
    try {
        const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.log(error);
    }
    }

export const login = async (object) => {
    try {
        const res = await instancOfAuth.post("sign_in/", {
            remember_me: false,
            ...object,
        });

        return res.data;
    } catch (error) {
        throw error
    }
};

export const sendOtp = async (email) => {
    try {
        const res = await instancOfAuth.post("forgot_password/", email)
        return res.data
    } catch (error) {
        throw error
    }
}

export const otpVerify = async (object) => {
    try {
        const res = await instancOfAuth.post("forgot_password/verify/", {
            ...object
        })
        console.log(object)
        return res
    } catch (error) {
        throw error
    }
}

export const updatePass = async (object) => {
    try {
        const res = await instanceWithToken.put("forgot_password/update/", {
            ...object
        })
        return res
    } catch (error) {
        throw error
    }
}

export const sendOtpEmail = async (email) => {
    try {
        const res = await instanceWithToken.post("confirm_email/", {
            email: email
        })
        return res
    } catch (error) {
        throw error
    }
}

export const verifyOtpEmail = async (object)=>{
    try {
        const res = await instanceWithToken.put("confirm_email/update/", {
            ...object
        })
        return res
    } catch (error) {
        throw error
    }
}
