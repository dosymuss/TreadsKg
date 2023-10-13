import axios from "axios"

export const instanceWithToken = axios.create({
    baseURL: "https://pavel-backender.org.kg/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
    }
})


export const getProfileInfo = async (username) => {
    try {
        const res = await instanceWithToken.get(`user/profile/${username}/`)
        console.log(res)
        return res
    } catch (error) {
        throw error
    }
}

export const getMyProfile = async () => {
    try {
        const res = await instanceWithToken.get("user/profile/me/")
        const user = {
            photo: res.data.photo,
            username: res.data.username
        }
        localStorage.setItem("userData", JSON.stringify(user))
        return res
    } catch (error) {
        throw error
    }
}

export const getProfileById = async (id) => {
    try {
        const res = await instanceWithToken.get(`user/profile/${id}/`)
        return res
    } catch (error) {
        throw error
    }
}

export const profileUpdate = async (obj) => {
    try {
        const res = await instanceWithToken.put("user/profile/update/", {
            username: obj.username,
            full_name: obj.name,
            bio: obj.bio ? obj.bio : "null",
            website: obj.link ? obj.link : "null",
            location: "kopok",
            is_private: obj.private
        }
        )
        return res
    } catch (error) {
        throw error
    }
}

export const logout = async () => {
    try {
        const res = instanceWithToken.post("logout/", {
            refresh_token: localStorage.getItem("refresh")
        })
        return res
    } catch (error) {
        throw error
    }
}

export const getFollowers = async (id) => {
    try {
        const res = await instanceWithToken.get(`user/profile/followers/${id}/`)
        return res
    } catch (error) {
        throw error
    }
}

export const getFollowing = async (id) => {
    try {
        const res = await instanceWithToken.get(`user/profile/follows/${id}/`)
        return res
    } catch (error) {
        throw error
    }
}

export const getPendingPers = async () => {
    try {
        const res = await instanceWithToken.get("user/profile/follow_requests/")
        return res
    } catch (error) {
        throw error
    }
}



export const PostFollow = async (id) => {
    try {
        const res = await instanceWithToken.post("user/profile/follow/", {
            followee: id
        })
        return res
    } catch (error) {
        throw error
    }
}


export const PostUnFollow = async (id) => {
    try {
        const res = await instanceWithToken.post("user/profile/unfollow/", {
            followee: id
        })
        return res
    } catch (error) {
        throw error
    }
}





export const newPhoto = async (photoUrl) => {
    try {
        const res = await instanceWithToken.patch("user/profile/me/edit_photo/", photoUrl)
        return res
    } catch (error) {
        throw error
    }
}

export const deleteMyPhoto = async () => {
    try {
        const res = await instanceWithToken.delete("user/profile/me/delete_photo/")
        return res
    } catch (error) {
        throw error
    }
}

export const getFollowersById = async (id) => {
    try {
        const res = await instanceWithToken.get(`user/profile/followers/${id}/`)
        return res
    } catch (error) {
        throw error
    }
}
export const getFollowingById = async (id) => {
    try {
        const res = await instanceWithToken.get(`user/profile/follows/${id}/`)
        return res
    } catch (error) {
        throw error
    }
}



// ...

instanceWithToken.interceptors.response.use(
    (res) => res,
    async (err) => {
        if (axios.isAxiosError(err)) {
            if (err.response.status === 401) {
                try {
                    const { data } = await axios.post(
                        "https://pavel-backender.org.kg/sign_in/refresh/",
                        {
                            refresh: localStorage.getItem("refresh"),
                        }
                    );
                    // console.log(data)
                    localStorage.setItem("access", data.access);
                    localStorage.setItem("refresh", data.refresh);
                    // Перенаправляем пользователя на другую страницу (замените URL на нужный)
                    window.location.href = "http://localhost:3000/";
                    return axios(err.config);
                } catch (error) {
                    if (error) {
                        // Обработка ошибки обновления токена
                        console.log(error);
                    }
                }
            }
        }
        return Promise.reject(err);
    }
);




