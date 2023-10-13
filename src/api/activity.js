import { instanceWithToken } from "./profile";

export const getAll = async () => {
    try {
        const res = await instanceWithToken.get("notifications/")
        return res
    } catch (error) {
        throw error
    }
}

export const getFollowing = async () => {
    try {
        const res = await instanceWithToken.get("notifications/new_subscriber/")
        return res
    } catch (error) {
        throw error
    }
}

export const getComments = async () => {
    try {
        const res = await instanceWithToken.get("notifications/new_comment/")
        return res
    } catch (error) {
        throw error
    }
}


export const getRequest = async () => {
    try {
        const res = await instanceWithToken.get("notifications/subscribe_request/")
        return res
    } catch (error) {
        throw error
    }
}

export const userConf = async (id) => {
    try {
        const res = await instanceWithToken.post("user/profile/follow_requests/allow/",{
            follower:id
        })
        return res
    } catch (error) {
        throw error
    }
}

export const userHide = async (id) => {
    try {
        const res = await instanceWithToken.post("user/profile/follow_requests/decline/",{
            follower:id
        })
        return res
    } catch (error) {
        throw error
    }
}