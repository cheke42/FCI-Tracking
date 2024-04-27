import { useParams } from "react-router-dom"
import { useState,useEffect } from 'react';
import { Container,Row,Col,Form } from "react-bootstrap";
import { GraphComponent } from "./GraphComponent";
import { TableFund } from "./TableFund";
import { _fetch } from '../../helper/httpClient';

export function DetailFund(){

    const 
    {ticker} = useParams(),
    [header, setHeader] = useState([]),
    [analiticas, setAnaliticas] = useState([]),
    headerURL = 'fund/header/'    

    useEffect(() =>{
        const asyncGetHeaderData = async () => {
            let headData = (await _fetch(headerURL+ticker)).data
            setHeader(headData)
        }
        asyncGetHeaderData(ticker)
    },[ticker])

    return (
        <Container>
            <Row>
                <h1 className="text-center mt-4 mb-5">Detalle del fondo</h1>
                <Col>
                    <h4># Datos del Fondo</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre (Ticker)</Form.Label>
                        <Form.Control placeholder={`${header.title} (${header.ticker})`} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" placeholder={header.description} disabled />
                    </Form.Group>
                </Col>
                <Col xl="12">
                    <h4 className="mt-5"># Rendimiento</h4>
                    <GraphComponent analiticas={analiticas} header={header} title="Últimas 30 variaciones"/>
                </Col>
                <Col xl="12">
                    <h4 className="mt-5"># Tabla de variación</h4>
                    <TableFund ticker={ticker} analiticas={analiticas} setAnaliticas={setAnaliticas} />
                </Col>
            </Row>
        </Container>
    )
}