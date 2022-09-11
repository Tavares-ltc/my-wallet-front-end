import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function MyWallet({ userName, setAuthorization, authorization },) {
    const navigate = useNavigate()
    const [cashflowList, setCashFlowList] = useState([])
    const token = JSON.parse(localStorage.getItem('authorization'))
    useEffect(() => {
        axios.get("http://localhost:5000/cashflow", token)
            .then((res) => {
                const list = (res.data)
                setCashFlowList(list)
                console.log(list)
            })
            .catch((res) => {
                console.log(res)
            })

    }, [])


    if (!token) {
        return (
            <Page>
                <Header>
                    <h1>Olá, tente fazer login.</h1>
                    <ion-icon name="log-out-outline" onClick={() => navigate('/')}></ion-icon>
                </Header>
                <BalancePage>

                    <h3>401 unauthorized</h3>
                </BalancePage>
                <Botton>
                    <Button >
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <h2>Nova <br /> entrada</h2>
                    </Button>
                    <Button>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <h2>Nova <br /> saida</h2>
                    </Button>
                </Botton>
            </Page>
        )
    }


    return (
        <Page>
            <Header>
                <h1>Olá, {userName}</h1>
                <ion-icon name="log-out-outline" onClick={() => {
                    localStorage.removeItem("authorization")
                    setAuthorization(false)
                    navigate('/')
                }}>
                </ion-icon>
            </Header>
            <BalancePage>
                <Transactions>
                    {cashflowList.map((iten) => <Transaction date={iten.date} value={iten.value} description={iten.description} type={iten.type} />)}
                </Transactions>
                <Balance></Balance>
            </BalancePage>
            <Botton>
                <Button onClick={() => navigate('/entrada')}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <h2>Nova <br /> entrada</h2>
                </Button>
                <Button onClick={() => navigate('/saida')}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <h2>Nova <br /> saida</h2>
                </Button>
            </Botton>
        </Page>
    )
}

function Balance() {
    return (
        <BalanceWrappler>
            <h7>Saldo:</h7>
            <h8>123</h8>
        </BalanceWrappler>
    )
}

function Transaction({ date, value, description, type }) {
    console.log(date)
    return (

        <TransactionWrappler>
            <h4>{date} <strong>{description}</strong></h4>
            {(type === 'positive') ? <h5>{value}</h5> : <h6>{value}</h6>}
        </TransactionWrappler>

    )
}

const Transactions = styled.div`


`
const BalanceWrappler = styled.div`
display: flex;
justify-content: space-between;
`
const TransactionWrappler = styled.div`
display: flex;
justify-content: space-between;
h4{
        color: gray;
        font-family: Arial, Helvetica, sans-serif;
    }
    h5{
        color: #00d27d;
        font-family: Arial, Helvetica, sans-serif;
    }
    h6{
        color: red;
        font-family: Arial, Helvetica, sans-serif;
    }
strong {
    font-family: Arial, Helvetica, sans-serif;
    color: #1c1b1b;
}
`
const Page = styled.div`

box-sizing: border-box;
padding: 25px 15px 0 15px;
width: 400px;
height: 100vh;
background-color: #00d27d;
display: flex;
flex-direction: column;
h1 {
 font-family: Arial, Helvetica, sans-serif;
 font-size: 30px;
 color: white;
 font-weight: 700;
}
`
const Header = styled.div`
box-sizing: border-box;
display: flex;
justify-content: space-between;
margin-bottom: 40px;

ion-icon{
    width: 30px;
    height: 30px;
    color:white;
    fill: white; 
    cursor:pointer;
}
`
const BalancePage = styled.div`
padding: 20px;
box-sizing: border-box;
height: 70%;
width: 100%;
background-color: white;
border-radius: 2%;
margin-bottom: 25px;
display: flex;
flex-direction: column;
justify-content: space-between;
h3{
    color: red;
}
`

const Botton = styled.div`
width: 100%;
height: 15%;
display: flex;
gap: 10px;
border-style: none;

color: white;
font-size: 20px;
font-weight: 700;
cursor : pointer ;
font-family: Arial, Helvetica, sans-serif;
`
const Button = styled.div`
width: 49%;
height: 100%;
box-sizing: border-box;
border-radius: 4%;
background-color: #76de9a;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 5%;
h2 {
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
}

ion-icon{
    width: 25px;
    height: 25px;
    
}
`
export { Page, Header }