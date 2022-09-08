import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./HomePage";
import MyWallet from "./MyWallet";
import CashFlow from "./CashFlow";
import styled from "styled-components";

export default function App() {
    const [userName, setUserName] = useState('')
    return (
        <>


            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage type={'sign-in'} setUserName={setUserName} />} />
                    <Route path='/cadastro' element={<HomePage type={'sign-up'}  />} />
                    <Route path='/mywallet' element={<MyWallet/>} userName={userName} />
                    <Route path='/entrada' element={<CashFlow/>} type={'in'} />
                    <Route path='/saida' element={<CashFlow/>} type={'out'} />

                </Routes>
            </BrowserRouter>
        </>
    )
}


