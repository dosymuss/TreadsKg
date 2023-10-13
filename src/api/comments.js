
import { instanceWithToken } from "./profile";



export const deleteComment = async (id)=>{
    try {
        const res = await instanceWithToken.delete(`post/comment/${id}/`)
        return res
    } catch (error) {
        throw error
    }
}

export const likeComment = async (id)=>{
    try {
        const res = await instanceWithToken.patch(`post/comments/${id}/like_unlike/`)
        return res
    } catch (error) {
        throw error
    }
}
