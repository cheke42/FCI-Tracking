import { useState,useEffect } from 'react';
import {Container, Row,Col,Table,Button,Spinner} from 'react-bootstrap'
import { FaCloudDownloadAlt,FaArrowAltCircleRight  } from "react-icons/fa";
import { FaCloudArrowDown } from "react-icons/fa6";
import { FundModalList } from './FundModalList';
import { _fetch } from '../helper/httpClient';
import DataTable from 'datatables.net-bs5';
import language from 'datatables.net-plugins/i18n/es-AR.mjs';

import { Link } from "react-router-dom";

export function FundsList(){
    
    //-> VARIABLES
    const fundsEndpoint = 'fund';
    const fundAnalyticsEndpoint = 'fund/remote/analytics/'

    new DataTable(`.datatable`,{language: language,bDestroy: true,responsive:true})

    //-> STATES
    const [fundsList, setFundsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState([]);
    //-> EFFECTS
    useEffect(() => {
        asyncGetFundsList()
    }, []);

    const asyncGetFundsList = async() => {
        let 
        jsonResponse = await _fetch(fundsEndpoint),
        funds = jsonResponse.data ? jsonResponse.data : []
        setFundsList(funds)
        setIsLoading(false)
    }

    //-> HANDLERS
    const handlerDownloadData = async(ev,fondo) =>{
        let arr = isDownloading.slice()
        arr.push(fondo.ticker)
        setIsDownloading(arr)
        await _fetch(fundAnalyticsEndpoint+fondo.ticker)
        arr = isDownloading.slice()
        let idx = arr.indexOf(fondo.ticker)
        arr.splice(idx,1)
        setIsDownloading(arr)
    }

    const handlerDownloadAll = (ev) =>{
        /*const buttonsUpdate = document.querySelectorAll(".download-button")
        buttonsUpdate.forEach(btn => {
            console.log("Hola",btn)
            btn.click()
        })*/
    }

    return (
        <Container>
            <Row>
                <h2 className="text-center mt-4 mb-5">Lista de fondos</h2>
                <Col>
                    <div className='text-end'>
                        <FundModalList asyncGetFundsList={asyncGetFundsList}/>
                        <Button variant="dark ms-1" onClick={handlerDownloadAll} title="Descargar">
                            <FaCloudDownloadAlt/> Descargar todas
                        </Button>
                    </div>
                    <Table id="my-table">
                        <thead className='bg-dark text-white'>
                            <tr>
                                <th scope="col"> Ticker</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading &&
                                <tr className='text-center'>
                                    <td><Spinner animation="grow" variant="info" /></td>
                                    <td><Spinner animation="grow" variant="info" /></td>
                                    <td><Spinner animation="grow" variant="info" /></td>
                                </tr>
                            }
                            {!isLoading &&
                            fundsList.map((fondo) => (
                                <tr className='text-center' key={`fondo-${fondo.id}`}>
                                    <td>{fondo.ticker}</td>
                                    <td>{fondo.title}</td>
                                    <td>
                                            <Link className="nav-link d-inline" to={`/fondo/detalle/${fondo.ticker}`}><Button variant="primary" key={`btn-${fondo.id}`}><FaArrowAltCircleRight/> Detalle</Button></Link>
                                            <Button variant='dark' value={fondo.ticker} className='download-button d-inline ms-1' title="Obtener datos analíticos" onClick={((ev) => handlerDownloadData(ev,fondo))}>
                                                {isDownloading.includes(fondo.ticker) && (<FaCloudArrowDown title="Descargando" style={{color: '#20c997'}}/>)}
                                                {!isDownloading.includes(fondo.ticker) && (<FaCloudArrowDown title="Descargar"/>)}    
                                            </Button>
                                    </td>
                                </tr>
                                ))
                            }
                            {
                                !isLoading && fundsList.length === 0 && 
                                <tr>
                                    <td colSpan={3} className='text-center'>Sin datos</td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}