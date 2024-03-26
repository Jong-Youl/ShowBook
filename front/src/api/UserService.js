// import axios from 'axios';
import { localAxios } from '../utils/http-commons';

const REACT_APP_BASE_URL = "http://localhost:8080"

const local = localAxios()

class UserService {

    async login (memberId) {
        console.log("")
        local
          .post(`${REACT_APP_BASE_URL}/api/auth/token?memberId=${memberId}`,{},{withCredentials: true})
          .then((res) => {
            alert("슈욱에 오신 것을 환영합니다!")
            console.log(res)
            // const accessToken = res["headers"]["authorization"]
            // localStorage.setItem("accessToken",accessToken)
            window.location.replace("/main")
          })
          .catch(error => {
            alert("불러오기 실패")
            console.error(error);
          })
    }


    async googleLogin() {
        try {
            window.location.replace(`${REACT_APP_BASE_URL}/oauth2/authorization/google`);
        } catch (error) {
            console.error("구글 로그인 실패 : ",error)
        }
    }

    async kakaoLogin() {
        try {
            window.location.replace(`${REACT_APP_BASE_URL}/oauth2/authorization/kakao`);
        } catch (error) {
            console.error("구글 로그인 실패 : ",error)
        }
    }

    async signup(memberInfo) {
        const signupRequest = {
            email : memberInfo.email,
            name : memberInfo.name,
            nickname : memberInfo.nickname,
            gender : memberInfo.gender,
            age : memberInfo.age,
            categories : memberInfo.categories,
            roleName : memberInfo.roleName,
            memberImageUrl : memberInfo.memberImageUrl
        }

        local
            .post("http://localhost:8080/api/member/signup",
            signupRequest,{})
            .then((res) => {
                console.log(res)
                if (res.status == 201){
                    alert("회원가입 완료!")
                    const memberId = res.data
                    this.login(memberId) // 회원가입 즉시 로그인
                }
            })
            .catch((error) => {
                alert("회원가입 실패!")
                console.error(error)
            })
    }

    async logout() {
        local
            .delete(`${REACT_APP_BASE_URL}/api/auth/logout`,
                    {headers : {
                        "Authorization" : localStorage.getItem("accessToken")
                    }})
            .then((res) => {
                console.log(res)
                localStorage.clear()
                alert("로그아웃!")
                window.location.replace("/user/login");
                
            })
            .catch((error) => {
                console.error(error)
            })
    }

    async getBookListByCategory() {
        local.get(`${REACT_APP_BASE_URL}/api/member/reading-logs/category`,
                {
                    headers: {
                        "Authorization" : localStorage.getItem("accessToken")
                    }
                })
            .then((res) => {
                console.log(res)
            })
    }

    async getBookListByMonth() {
        local.get(`${REACT_APP_BASE_URL}/api/member/reading-logs/category`,
                {
                    headers: {
                        "Authorization" : localStorage.getItem("accessToken")
                    }
                })
            .then((res) => {
                console.log(res)
            })
    }



}


export {UserService};