import { useEffect,useState } from "react"
import {Badge, Button,ListGroup} from 'react-bootstrap';
import { Link  } from "react-router-dom";
import { _fetch } from '../../helper/httpClient';
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";


export function DetailWalletFooter({walletId}){

    //-> CONST && VAR
    const 
    walletBalance = 'wallet/balance/',
    walletPreviousBalance = 'wallet/previous_balance/',
    endpointTicker = 'wallet/ticker/',
    endpointLastPerfomance = 'wallet/last_perfomance/'

    
    //-> STATES
    const 
    [saldoActual, setSaldoActual] = useState(0),
    [saldoAnterior, setSaldoAnterior] = useState(0),
    [rendimientoPositivo, setRendimientoPositivo] = useState(false),
    [tickers, setTickers] = useState([])
    
    //-> EFFECTS
    useEffect(() =>{
        const asyncGetCurrentWallet = async() =>{
            let
            respLastPerfomance = (await _fetch(endpointLastPerfomance+walletId)),
            lastPerfomanceDate = respLastPerfomance.data ? (respLastPerfomance.data.ultima_analitica) : (''),
            _currentBalance = (await _fetch(`${walletBalance+walletId}/${lastPerfomanceDate}`)).data[0].saldo,
            _previousBalance = (await _fetch(`${walletPreviousBalance+walletId}/${lastPerfomanceDate}`)).data[0].saldo,
            _tickers = (await _fetch(`${endpointTicker}${walletId}`)).data
            setRendimientoPositivo(_previousBalance <= _currentBalance)
            setSaldoActual(_currentBalance)
            setTickers(_tickers)
            setSaldoAnterior(_previousBalance)
        }
        asyncGetCurrentWallet()        
    },[walletId])


    return (
        <ListGroup key={`wallet-list-group-${walletId}`}>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={`fund-header-${walletId}`}>
                <div className="ms-2">
                    <div className="fw-bold">Cantidad fondos</div>
                    {tickers.length} | ${saldoAnterior.toFixed(2)}
                </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" key={`fund-details-${walletId}`}  style={{minHeight: "10rem"}}>
                <div className="ms-2">
                    <div className="fw-bold">Fondos</div>
                    <div className="text-center" style={{minHeight: "3rem"}}>
                        { tickers &&tickers.map((t) => ( <div className="d-inline-block" key={`ticker-${walletId}-${t.ticker}`}><Badge className="ms-1" bg="secondary">{t.ticker}</Badge></div> ))}
                    </div>
                </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={`fund-saldo-${walletId}`}>
                <div className="ms-2">
                    <div className="fw-bold">Saldo</div>
                    <div className="fs-2">${(saldoActual).toLocaleString('es-ES', {maximumFractionDigits:2})}</div>
                </div>
                <Badge bg={rendimientoPositivo ? 'success' : 'danger'} pill>
                        $ {rendimientoPositivo ? '+' : '-'}{(saldoActual-saldoAnterior).toLocaleString('es-ES', {maximumFractionDigits:2})} 
                        { rendimientoPositivo ?  <FaArrowTrendUp />:  <FaArrowTrendDown />}
                </Badge>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-block text-center" key={`fund-buttons-${walletId}`}>
                <Link className="nav-link" to={`/billetera/detalle/${walletId}`}><Button variant="primary" key={`btn-${walletId}`}><FaArrowAltCircleRight/> Detalle</Button></Link>
            </ListGroup.Item>
        </ListGroup>
    )
}