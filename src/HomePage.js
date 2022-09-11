import styled from 'styled-components';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function HomePage({ type, setUserName, authorization, setAuthorization}) {
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' })
    const [hover, setHover] = useState(false);
    const [passowrdValidationText, setPasswordValidationText] = useState('')
    const navigate = useNavigate()

    if(type=== 'sign-in' && authorization) {
        navigate('/mywallet')
    }

    if (type === 'sign-in') {

        return (
            <Page >
                <h1 >My Wallet</h1>
                <Forms onSubmit={sendData} hover={hover}>
                    <form >
                        <input type='email' value={loginData.email} placeholder='E-mail' name='email' onChange={handleLogin} required />
                        <input type='password' value={loginData.password} placeholder='Senha' name='password' onChange={handleLogin} required />
                        <button type='submit' value='entrar'> Entrar</button>
                    </form>
                    <p onMouseOver={() => setHover(!hover)}
                        onMouseLeave={() => setHover(!hover)}
                        onClick={() => navigate('/cadastro')}> Primeira vez? Cadastre-se!</p>
                </Forms>
            </Page>
        )
    }

    return (
        <Page >
            <h1 >My Wallet</h1>
            <Forms onSubmit={sendData} hover={hover}>
                <form >
                    <input type='text' placeholder='Nome' name='name' onChange={handleSignUp} required />
                    <input type='email' placeholder='E-mail' name='email' onChange={handleSignUp} required />
                    <input type='password' placeholder='Senha' name='password' onChange={handleSignUp} required />
                    <input type='password' placeholder='Confirme a senha' name='password_confirm' onChange={handleSignUp} required />
                    <p>{passowrdValidationText}</p>
                    <button type='submit' value='entrar'> Entrar </button>
                </form>
                <p onMouseOver={() => setHover(!hover)}
                    onMouseLeave={() => setHover(!hover)}
                    onClick={() => navigate('/')}> Já tem cadastro? Faça o login!</p>
            </Forms>
        </Page>
    )
    function sendData(event) {
        event.preventDefault();
        if (type === 'sign-in') {
            console.log(loginData)
            axios.post("http://localhost:5000/sign-in", loginData).then((res) => {
                const token = ({
                    headers: {
                        'authorization': `Bearer ${res.data.token}`
                    }
                })
                localStorage.setItem("authorization", JSON.stringify(token));
                setAuthorization(token)

                setUserName(res.data.name)
                navigate('/mywallet')
            }).catch((err) => {
                alert('Verifique o email e a senha.');
                console.log(err);
            })
        } else {
            //verificar se as senhas são iguais
            if (signUpData.password !== signUpData.password_confirm) {
                setPasswordValidationText('As senhas devem ser iguais.')
                return;
            }
            setPasswordValidationText('');
            delete signUpData.password_confirm

            axios.post("http://localhost:5000/sign-up", signUpData).then(() => {
                alert('Usuário criado com sucesso!');
                navigate('/')
            }).catch(err => {
                console.error(err);
                alert("Erro ao fazer cadastro! Consulte os logs.");
            });
        }

    }


    function handleSignUp(event) {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value
        })
    }

    function handleLogin(event) {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

}


const Page = styled.div`
width: 400px;
height: 100vh;
background-color: #00d27d;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

h1{
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    color: white;
    font-size: 50px;
    
}

@media only screen and (min-width: 200px){
    max-width: 640px;
}
`
const Forms = styled.div`
width: 80%;
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
    
    &:focus{
 outline: 2px solid #21bb57; 
    }
}
form>p{
    margin-top: 0;
    color: #ff4848ff;
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
p {
color: white;
margin-top: 30px;
font-weight: 700;
cursor : pointer ;
text-decoration: ${props => props.hover ? 'underline' : 'none'};
font-family: Arial, Helvetica, sans-serif;
}
`
