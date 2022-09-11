import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import MyWallet from "./MyWallet";
import CashFlow from "./CashFlow";
import axios from "axios";


export default function App() {
    const [userName, setUserName] = useState('')
    const [authorization, setAuthorization] = useState('')

    useEffect(() => {
        const storedToken = localStorage.getItem("authorization")
        if (!storedToken) {
            return setAuthorization(false)
        }
        const token = JSON.parse(storedToken)
        console.log(storedToken)
        axios.get("http://localhost:5000/session", token).
            then((res) => {
                if (userName !== res.data.name) {
                    setUserName(res.data.name)
                }
            })
            .catch()
        if (authorization !== token) {
            setAuthorization(token)
        }
    }, [])



    return (
        <>


            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage type={'sign-in'} setUserName={setUserName} authorization={authorization} setAuthorization={setAuthorization} />} />
                    <Route path='/cadastro' element={<HomePage type={'sign-up'} />} />
                    <Route path='/mywallet' element={<MyWallet userName={userName} authorization={authorization} setAuthorization={setAuthorization} />} />
                    <Route path='/entrada' element={<CashFlow type={'in'} authorization={authorization} />} />
                    <Route path='/saida' element={<CashFlow type={'out'} authorization={authorization} />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}


