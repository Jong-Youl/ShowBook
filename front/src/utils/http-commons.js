import axios from 'axios'
// import { UserService } from '../api/UserService';

const REACT_APP_BASE_URL = "http://localhost:8080"

// const userService = new UserService()

function localAxios() {
    const instance = axios.create({
        baseURL : REACT_APP_BASE_URL,
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
        },
        async (error) => {
            console.error(error)
            // if(error.status === 400 && error.data.message ==="RELOGIN") {
            //     console.log(error)
            //     // userService.logout()
            // }
        }
    )
    return instance

}

export {localAxios}