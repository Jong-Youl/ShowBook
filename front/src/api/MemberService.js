import { localAxios } from '../utils/http-commons';


const BASE_URL = process.env.REACT_APP_BASE_URL

const local = localAxios();

class MemberService {
    
    async login(memberId) {
        try {
            const res = await local.post(`${BASE_URL}/api/auth/token?memberId=${memberId}`, {}, { withCredentials: true });
            return res.data;
        } catch (error) {
            alert("불러오기 실패");
            console.error(error);
        }
    }


    async googleLogin() {
        try {
            window.location.replace(`${BASE_URL}/oauth2/authorization/google`);
        } catch (error) {
            console.error("구글 로그인 실패 : ",error)
        }
    }

    async kakaoLogin() {
        try {
            window.location.replace(`${BASE_URL}/oauth2/authorization/kakao`);
        } catch (error) {
            console.error("카카오 로그인 실패 : ",error)
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
            .post(`${BASE_URL}/api/member/signup`,
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
            .delete(`${BASE_URL}/api/auth/logout`,
                    {headers : {
                        "Authorization" : localStorage.getItem("accessToken")
                    }},{withCredentials: true})
            .then((res) => {
                console.log(res)
                localStorage.clear()
                window.location.replace("/user/login");
            })
            .catch((error) => {
                console.error(error)
            })
    }


    async getBookListByCategory() {
        try{
            const res = await local.get(`${BASE_URL}/api/member/reading-logs/category`,
                {headers: {"Authorization" : localStorage.getItem("accessToken")}})
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    async getBookListByMonth(year) {
        try{
            const res = await local.get(`${BASE_URL}/api/member/reading-logs/monthly?year=${year}`,
                {headers: {"Authorization" : localStorage.getItem("accessToken")}})
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

}


export {MemberService};