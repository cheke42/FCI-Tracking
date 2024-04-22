import { Container, Row, Col, Card} from 'react-bootstrap'
import { FaWallet,FaList } from "react-icons/fa";
import { Link  } from "react-router-dom";
import { useEffect } from 'react';
import { _checkSecurity } from '../helper/checkSecurity';
import  { useNavigate } from 'react-router-dom'

export function Panel({loggedIn}){

    //-> VARIABLES
    const 
    cards = [{nombre: "Billeteras",icon: <FaWallet style={{fontSize: "5rem"}}/>,to: 'billeteras'},{nombre:"Lista de fondos",icon: <FaList style={{fontSize: "5rem"}}/>,to: 'lista-fondos'}], 
    navigate = useNavigate()

    //-> HANDLERS 
    useEffect(() => {
        _checkSecurity(navigate,loggedIn)
    }, [navigate,loggedIn]);


    return (
        <>
            <h2 className="text-center mt-2 mb-4">¡Bienvenido 👾!</h2>
            <Container>
                <Row className="mt-5">
                    <Col></Col>
                    {cards.map((card) => {
                        return (
                            <Col xl="3" key={card.nombre}>
                                <Link className="nav-link d-inline" to={`/${card.to}`}>
                                    <Card>
                                        <Card.Body>
                                            <div className="text-center">
                                                {card.icon} 
                                                <Card.Title className="text-center">{card.nombre}</Card.Title>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })}
                    <Col></Col>
                </Row>
            </Container>
        </>
    )

}