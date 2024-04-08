import { useState } from 'react';
import {Container,Row,Col,Form,InputGroup,Button } from 'react-bootstrap';
import { FaUserAstronaut,FaSignInAlt,FaEraser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import  { useNavigate } from 'react-router-dom'

export function Login({setLoggedIn}){
    
    // States
    const
    [username,setUsername] = useState(''),
    [password,setPassword] = useState(''),
    [btnDisabled,setBtnDisabled] = useState(false),
    [btnLoginTxt,setBtnLoginTxt] = useState('Ingresar'),
    navigate = useNavigate(),

    // Event Handlers
    handleCleanForm = (ev) => {
        const
        _username = document.getElementById("username")
        _username.focus()
        setUsername('')
        setPassword('')
    },
    handleLogin = (ev) => {
        setBtnLoginTxt('Ingresando...')
        setBtnDisabled(true)
        setTimeout(() => {
            setLoggedIn(true);
            navigate(`/`, { replace: true });
            //return <Redirect to='/'  />
        }, 1000);
    },
    
    handleChangeForm = (e) => {
        console.log()
        switch(e.target.id){
            case 'username':
                setUsername(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }


    return (
        <Container>
            <h1 className='text-center mt-4'>Ingreso al sistema</h1>
            <Row >
                <Col />
                <Col xxl={6} lg={9} sm={12} >
                    <Form className='mt-5'>
                        <Form.Group>
                            <Form.Label>Nombre de usuario</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text ><FaUserAstronaut /></InputGroup.Text>
                                <Form.Control id="username" placeholder="Nombre de usuario" aria-label="Nombre de usuario" aria-describedby="username" autoFocus value={username} onChange={handleChangeForm}/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text><MdOutlinePassword /></InputGroup.Text>
                                <Form.Control id="password" type="password" placeholder="********" aria-label="password" aria-describedby="password" value={password} onChange={handleChangeForm}/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="text-center">
                            <Button variant="secondary" className="me-1" onClick={ev => handleCleanForm(ev)}><FaEraser/> Limpiar</Button>
                            <Button variant="primary" onClick={ ev => handleLogin(ev)} disabled={btnDisabled}><FaSignInAlt /> {btnLoginTxt}</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col />
            </Row>
        </Container>
    )
}