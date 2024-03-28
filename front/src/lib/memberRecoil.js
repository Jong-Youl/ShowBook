import {atom} from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist({
    key : "localStorage",
    storage : localStorage
})

export const memberState = atom({
    key : "member",
    default : {},
    effects_UNSTABLE : [persistAtom]
})

export const loginState = atom({
    key : "login",
    default : localStorage.getItem("accessToken") ? true : false
})

export const readCategoricalState = atom({
    key : "readCategorical",
    default : {},
    effects_UNSTABLE : [persistAtom]
})

export const readMonthlyState = atom({
    key : "readMonthly",
    default : {},
    effects_UNSTABLE : [persistAtom]
})