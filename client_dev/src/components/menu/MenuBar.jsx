import {Container,Nav,Navbar,NavDropdown } from 'react-bootstrap';
import { MdManageAccounts,MdAccountCircle,MdInfo } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import menuBarStyle from './MenuBar.module.css';
import  { useNavigate } from 'react-router-dom'


export function MenuBar({loggedIn, setLoggedIn}){
    
    const 
    handlerLogOut = (e) =>{
        setLoggedIn(false)
        setTimeout(() => {
            navigate(`/login`, { replace: true });
        }, 1000);
    },
    navigate = useNavigate()
    
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <div className={menuBarStyle.wrapper}>
                        <svg className={menuBarStyle.svg}>
                            <text x="0%" y="75%" className={menuBarStyle.text}>📈 BULLTRACKING</text>
                        </svg>
                    </div>
                </Navbar.Brand>
                {loggedIn && 
                    <>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Primero</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <NavDropdown title={<MdManageAccounts />} id="navbarprofile" align="end"> 
                                    <NavDropdown.Item href="#action3"><MdAccountCircle /> Perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="#action3"><MdInfo /> Acerca de</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handlerLogOut}><FaSignOutAlt /> Cerrar sesión</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>   
                    </>      
                }
            </Container>
        </Navbar>
    )
}