import { instanceWithToken } from "./profile";

export const postTreads = async (object) => {
    try {
        const res = await instanceWithToken.post("post/", object)
        return res
    } catch (error) {
        throw error
    }
}



export const getPost = async () => {
    try {
        const res = await instanceWithToken.get("post/")
        return res
    } catch (error) {
        throw error
    }
}


export const postLikeUnlike = async (id) => {
    try {
        const res = await instanceWithToken.patch(`post/like_unlike/${id}/`)
        console.log(res);
        return res
    } catch (error) {
        throw error
    }
}

export const getPostForYou = async () => {
    try {
        const res = await instanceWithToken.get("feed/for_you/?page_size=50")
        return res

    } catch (error) {
        throw error
    }
}

export const getPostForFollowing = async () => {
    try {
        const res = await instanceWithToken.get("feed/following/")
        return res
    } catch (error) {
        throw error
    }
}

export const getPostById = async (id) => {
    try {
        const res = await instanceWithToken.get(`post/${id}/view/`)
        return res
    } catch (error) {
        throw error
    }
}


export const deletePost = async (id) => {
    try {
        const res = await instanceWithToken.delete(`post/${id}/`)
        return res
    } catch (error) {
        throw error
    }
}


export const postComment = async (id, text) => {
    try {
        const res = await instanceWithToken.post(`post/${id}/comments/`, {
            post: id,
            text: text
        })
        return res
    } catch (error) {
        throw error
    }
}

export const getPostComments = async (id) => {
    try {
        const res = await instanceWithToken.get(`post/${id}/comments/`)
        return res
    } catch (error) {
        throw error
    }
}


export const postRepost = async (id) => {
    try {
        const res = await instanceWithToken.post(`post/${id}/repost/`, {
            repost: id
        })
        return res
    } catch (error) {
        throw error
    }
}


export const postQuote = async (id, text) => {
    try {
        const res = instanceWithToken.post(`post/${id}/quote/`, {
            text: text
        })
        return res
    } catch (error) {
        throw error
    }
}