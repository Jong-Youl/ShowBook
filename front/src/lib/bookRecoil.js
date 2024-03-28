import {atom} from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist({
    key : "localStorage",
    storage : localStorage
})

export const recommendBookState = atom({
    key : "recommendBook",
    default : {},
    effects_UNSTABLE : [persistAtom]
})