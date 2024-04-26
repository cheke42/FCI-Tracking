import { useEffect,useState } from "react"
import {Badge, Button,ListGroup} from 'react-bootstrap';
import { Link  } from "react-router-dom";
import { _fetch } from '../../helper/httpClient';
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";


export function DetailWalletFooter({walletId}){

    const 
    [billeteraActual, setBilleteraActual] = useState([]),
    [saldoActual, setSaldoActual] = useState(0),
    [saldoAnterior, setSaldoAnterior] = useState(0),
    [rendimientoPositivo, setRendimientoPositivo] = useState(false),
    [tickers, setTickers] = useState([]),
    currentWalletURL = 'wallet/detail/',
    lastWalletURL = 'wallet/previous_detail/',

    asyncGetCurrentWallet = async() =>{
        let 
        resBillteraActual = (await _fetch(currentWalletURL+walletId)).data,
        urlBilleteraAnterior = `${lastWalletURL}${walletId}/${resBillteraActual[0].ultima_actualizacion}`,
        resBilleteraAnterior = (await _fetch(urlBilleteraAnterior)).data,
        saldo_actual = 0,
        saldo_anterior = 0,
        list_tickers = []
        resBillteraActual.forEach((f) => saldo_actual += (f.cantidad * f.precio))
        resBilleteraAnterior.forEach((f) => saldo_anterior += (f.cantidad * f.precio))
        list_tickers = resBillteraActual.map((t) => (t.ticker))
        setRendimientoPositivo(saldo_actual >= saldo_anterior)
        setBilleteraActual(resBillteraActual)
        setSaldoActual(saldo_actual)
        setTickers(list_tickers)
        setSaldoAnterior(saldo_anterior)
    }

    useEffect(() =>{
        asyncGetCurrentWallet()
    },[])

    return (
        <ListGroup key={`wallet-list-group-${walletId}`}>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={`fund-header-${walletId}`}>
                <div className="ms-2">
                    <div className="fw-bold">Cantidad fondos</div>
                    {billeteraActual.length}
                </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center"  key={`fund-details-${walletId}`}>
                <div className="ms-2">
                    <div className="fw-bold">Fondos</div>
                    <div className="text-center" style={{minHeight: "3rem"}}>
                        { tickers.map((t) => ( <div className="d-inline-block" key={`ticker-${walletId}-${t}`}><Badge className="ms-1" bg="secondary">{t}</Badge></div> ))}
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