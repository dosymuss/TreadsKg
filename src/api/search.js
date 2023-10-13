import { instanceWithToken } from "./profile";



export const getSearch = async (text) => {
    try {
        const res = await instanceWithToken.get(`search/users/${text}/`)
        return res
    } catch (error) {
        throw error
    }
}

export const mutualFoll = async (id) => {
    try {
        const res = await instanceWithToken.post("user/profile/mutual_follow/", {
            followee: id
        })
        return res
    } catch (error) {
        throw error
    }
}

export const getUserPost = async (id)=>{
    try {
        const res = await instanceWithToken.get(`https://pavel-backender.org.kg/post/${id}/list/`)
        return res
    } catch (error) {
        throw error
    }
}