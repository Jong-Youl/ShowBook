import {useState,useEffect} from 'react';
import { memberState } from '../../../recoil/memberRecoil';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import {MemberService} from '../../../api/MemberService';

const memberService = new MemberService();

function Proxy() {
    const [memberId, setMemberId] = useState(null); 
    const setMemberInfo = useSetRecoilState(memberState)

    const navigate = useNavigate()

    useEffect(() => {
        const memberIdFromURL = new URL(document.location).searchParams.get("id")
        setMemberId(memberIdFromURL)
    },[])

    // memberId가 변하면 실행
    useEffect(() => {
        const getMemberInfo = async(memberId) => {
            let memberInfo = await memberService.login(memberId)
            if(memberInfo){
                setMemberInfo(memberInfo)
            }
        }

        if(memberId){
            getMemberInfo(memberId)
            navigate("/main")
        }
    },[memberId,setMemberInfo,navigate])

}

export default Proxy;