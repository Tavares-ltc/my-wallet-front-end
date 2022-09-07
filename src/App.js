import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import styled from "styled-components";

export default function App() {

    return (
        <>


            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage type={'sign-in'} />} />
                    <Route path='/cadastro' element={<HomePage type={'sign-up'} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}


