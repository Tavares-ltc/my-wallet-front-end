import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Page, Header } from "./MyWallet"
import axios from 'axios';

export default function CashFlow({ type, authorization }) {
    const [cashFlowData, setCashFlowData] = useState({ value: '', description: '' })
    const [flowType, setFlowType] = useState('entrada')
    const navigate = useNavigate()
    useEffect(() => {
        if (type === 'out') {
            setFlowType('saída')
        } else {
            setFlowType('entrada')
        }
    }, [type])

    
    return (
        <Page>
            <Header>
                <h1>Nova {flowType}</h1>
                <ion-icon name="arrow-undo-outline" onClick={() => navigate('/mywallet')}></ion-icon>
            </Header>
            <Forms onSubmit={sendData}>
                <form >
                    <input type='number' maxlength="6" value={cashFlowData.value} pattern="/[0-9]/" min="0" placeholder='Valor' name='value' onChange={handleCashFlowData} required />
                    <input type='text' maxlength="25" value={cashFlowData.description} placeholder='Descrição' name='description' onChange={handleCashFlowData} required />
                    <button type='submit' value='entrar'> Salvar {flowType}</button>
                </form>
            </Forms>
        </Page>
    )
    function handleCashFlowData(event) {
        setCashFlowData({
            ...cashFlowData,
            [event.target.name]: event.target.value
        })
    }
    function sendData(event) {
        event.preventDefault();
        
            axios.post(`http://localhost:5000/${(type === 'out')? 'cash-out':'cash-in'}`, cashFlowData, authorization)
            .then(() => setCashFlowData({ value: '', description: '' }))
            .catch((err) => {
                if(err.response.status === 401) {
                    localStorage.removeItem('authorization')
                    alert('Sua sessão expirou.')
                    navigate('/')
                } else {
                    alert(err)
                }
            })
    }
}


const Forms = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
input{
    box-sizing: border-box;
    padding-left: 10px;
    height: 50px;
    border-radius: 10px;
    border-style: none;
    margin-top: 20px;
    width: 100%;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    //retirando setas dos inputs type number:
/* Chrome, Safari, Edge, Opera */
&::-webkit-outer-spin-button,
&::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
&[type=number] {
  -moz-appearance: textfield;
}
    &:focus{
 outline: 2px solid #21bb57; 
    }
}
button {    
    margin-top: 20px;
    height: 40px;
    width: 101%;
    border-style: none;
    border-radius: 5px;
    background-color: #76de9a;
    color: white;
    font-size: 20px;
    font-weight: 700;
    cursor : pointer ;
    font-family: Arial, Helvetica, sans-serif;
    
}
`