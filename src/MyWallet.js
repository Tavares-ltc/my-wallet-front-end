import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function MyWallet({ userName }) {
    const navigate = useNavigate()

    return (
        <Page>
            <Header>
                <h1>Olá, fulano</h1>
                <ion-icon name="log-out-outline" onClick={()=> navigate('/')}></ion-icon>
            </Header>
            <BalancePage>

            </BalancePage>
            <Botton>
                <Button onClick={()=> navigate('/entrada')}>
                <ion-icon name="add-circle-outline"></ion-icon>
                <h2>Nova <br/> entrada</h2>
                </Button>
                <Button onClick={()=> navigate('/saida')}>
                <ion-icon name="remove-circle-outline"></ion-icon>
                <h2>Nova <br/> saida</h2>
                </Button>
            </Botton>
        </Page>
    )
}


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
box-sizing: border-box;
height: 70%;
width: 100%;
background-color: white;
border-radius: 2%;
margin-bottom: 25px;
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