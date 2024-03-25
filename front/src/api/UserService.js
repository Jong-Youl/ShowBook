import axios from 'axios';

class UserService {

    async login (memberId) {
        axios
          .post(`http://localhost:8080/auth/token?memberId=${memberId}`,{},{withCredentials: true})
          .then((res) => {
            alert("슈욱에 오신 것을 환영합니다!")
            console.log(res)
            const accessToken = res["headers"]["authorization"]
            localStorage.setItem("accessToken",accessToken)
            window.location.replace("/main")
          })
          .catch(error => {
            alert("불러오기 실패")
            console.error(error);
          })
    }


    async googleLogin() {
        try {
            window.location.replace("http://localhost:8080/oauth2/authorization/google");
        } catch (error) {
            console.error("구글 로그인 실패 : ",error)
        }
    }

    async kakaoLogin() {
        try {
            window.location.replace("http://localhost:8080/oauth2/authorization/kakao");
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

        axios
            .post("http://localhost:8080/member/signup",
            signupRequest,{})
            .then((res) => {
                alert("회원가입 완료!")
                const memberId = res.data
                this.login(memberId) // 회원가입 즉시 로그인
            })
            .catch((error) => {
                alert("회원가입 실패!")
                console.error(error)
            })
        
    }

}


export {UserService};