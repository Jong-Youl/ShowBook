import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

function localAxios() {
    const instance = axios.create({
        baseURL : BASE_URL,
        withCredentials: true,
        headers : {
            "Content-Type" : "application/json;charset=utf-8",
        },
    });

    instance.interceptors.response.use(
        // response header에 "Authorization"이 있으면 토큰 교체
        // 로그인 or 토큰 재발급로직
        (response) => {
            if (response["headers"]["authorization"] != null){
                const newAccessToken = response["headers"]["authorization"]
                localStorage.setItem("accessToken",newAccessToken);
            }
            return response
        },
        (error) => {
            // refreshToken 만료시 로그아웃
            if(error.response.status === 400 && error.response.data.message ==="RELOGIN") {
                localStorage.clear()
                alert("자동 로그아웃!")
                window.location.replace("/user/login")
            }
            return error;
        }
    )
    return instance

}

export {localAxios}