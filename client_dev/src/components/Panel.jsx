import {_fetch} from '../helper/httpClient'
import { Container, Row, Col, Card} from 'react-bootstrap'
import { FaWallet,FaList } from "react-icons/fa";
import { Link  } from "react-router-dom";

export function Panel(){

    //-> VARIABLES
    const 
    walletURL = `http://localhost:10000/api/wallet/`,
    cards = [{nombre: "Billeteras",icon: <FaWallet style={{fontSize: "5rem"}}/>,to: 'billeteras'},{nombre:"Lista de fondos",icon: <FaList style={{fontSize: "5rem"}}/>,to: 'lista-fondos'}],
       

    //-> HANDLERS 
    handlerFetchear = async() => {
        const resp = await _fetch(walletURL)
        console.log(resp)
    }

    return (
        <>
            <h1>I'm a panel</h1>
            <button onClick={handlerFetchear}>Fetchear</button>

            <hr />
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