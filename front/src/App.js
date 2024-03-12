import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Library from "./pages/Library";
import Add from "./pages/Add";
import MyPage from "./pages/MyPage";
import {MobileLayout} from "./layouts/DefaultLayout";
import Shorts from "./pages/Shorts";
import BottomNav from "./components/BottomNav";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MobileLayout/>}>
                    <Route path="main" element={<MainPage/>}/>
                    <Route path="shorts" element={<Shorts/>}/>
                    <Route path="add" element={<Add/>}/>
                    <Route path="library" element={<Library/>}/>
                    <Route path="mypage" element={<MyPage/>}/>
                </Route>
            </Routes>
            <BottomNav />
        </BrowserRouter>
    );
}

export default App;
