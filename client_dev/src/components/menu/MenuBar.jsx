import {Container,Nav,Navbar,NavDropdown } from 'react-bootstrap';
import { MdManageAccounts,MdAccountCircle,MdInfo } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import menuBarStyle from './MenuBar.module.css';
import  { useNavigate } from 'react-router-dom'
import { Link  } from "react-router-dom";

export function MenuBar({loggedIn, setLoggedIn, userLoggedIn,setUserLoggedIn}){
    //-> VARIBLES
    const 
    navigate = useNavigate(),
    
    //-> HANDLERS
    handlerLogOut = (e) =>{
        setLoggedIn(false)
        setUserLoggedIn('')
        navigate(`/login`, { replace: true });
    }
    
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Link to="/panel" className='navbar-brand'>
                    <div className={menuBarStyle.wrapper}>
                        <svg className={menuBarStyle.svg}>
                            <text x="0%" y="75%" className={menuBarStyle.text}>📈 BULLTRACKING</text>
                        </svg>
                    </div>
                </Link>
                {loggedIn && 
                    <>  
                        <Nav className="me-auto text-center">
                            <li className="nav-item"><Link className="nav-link" to="billeteras">Billeteras</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="lista-fondos">Lista de fondos</Link></li>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <NavDropdown title={<><MdManageAccounts /> {userLoggedIn.charAt(0).toUpperCase() + userLoggedIn.slice(1).toLowerCase()}</>} id="navbarprofile" align="end" value="pepa"> 
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