import { useState } from 'react';
import {Container,Row,Col,Form,InputGroup,Button,Badge } from 'react-bootstrap';
import { FaUserAstronaut,FaSignInAlt,FaEraser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import  { useNavigate } from 'react-router-dom';
import {_fetch} from '../helper/httpClient'

export function Login({setLoggedIn}){
    
    //-> VARIBLES
    const 
    loginURL = `http://localhost:10000/api/user/login`,
    navigate = useNavigate(),

    //-> STATES
    [username,setUsername] = useState('admin'),
    [password,setPassword] = useState('35889344a'),
    [btnDisabled,setBtnDisabled] = useState(false),
    [showError, setShowError] = useState(false),

    //-> HANDLERS
    handlerCleanForm = (ev) => {
        const
        _username = document.getElementById("username")
        _username.focus()
        setUsername('')
        setPassword('')

    },
    handlerLogin = async(ev) => {
        setBtnDisabled(true)
        const response = await _fetch(loginURL,'POST',{username,password})
        if (response && response.status === 'success'){
            setShowError(false)
            setLoggedIn(true);
            navigate(`/panel`, { replace: true });
        }else{
            setShowError(true)
        }
        setBtnDisabled(false)
    },
    handlerChangeForm = (e) => {
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
            <h1 className='text-center mt-4'>Ingreso al Sistema</h1>
            <Row >
                <Col />
                <Col xxl={6} lg={9} sm={12} >
                    <Form className='mt-5'>
                        <Form.Group>
                            <Form.Label>Nombre de usuario</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text ><FaUserAstronaut /></InputGroup.Text>
                                <Form.Control id="username" placeholder="Nombre de usuario" aria-label="Nombre de usuario" aria-describedby="username" autoFocus value={username} onChange={handlerChangeForm}/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><MdOutlinePassword /></InputGroup.Text>
                                <Form.Control id="password" type="password" placeholder="********" aria-label="password" aria-describedby="password" value={password} onChange={handlerChangeForm}/>
                            </InputGroup>
                        </Form.Group>
                        <div className='text-center mb-2 mt-1'>
                            {
                                showError && (<Badge bg="danger">Los datos ingresados son incorrectos</Badge>)
                            }
                        </div>
                        <Form.Group className="text-center">
                            <Button variant="secondary" className="me-1" onClick={ev => handlerCleanForm(ev)}><FaEraser/> Limpiar</Button>
                            <Button variant="primary" onClick={ ev => handlerLogin(ev)} disabled={btnDisabled}><FaSignInAlt /> Ingresar</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col />
            </Row>
        </Container>
    )
}