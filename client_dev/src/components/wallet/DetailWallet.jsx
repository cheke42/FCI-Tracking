import { useEffect, useState } from "react"
import { Container,Row,Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { WalletTable } from "./WalletTable";
import { PerfomanceTable } from "./PerfomanceTable";
import { MenuGraph } from "./MenuGraph";
import { Graph } from "./Graph";

import { _fetch } from '../../helper/httpClient';

export function DetailWallet(){
    //-> CONST & VAR
    const 
    walletFundsURL = 'wallet/detail/',
    lastWalletURL = 'wallet/previous_detail/',
    historialURL = 'wallet/detail_between/'

    //-> STATES
    const 
    {id_wallet} = useParams(),
    [fondos, setFondos] = useState([]),
    [billeteraAnterior, setBilleteraAnterior] = useState([]),
    [historial, setHistorial] = useState([]),
    [isLoading, setIsLoading] = useState(true),
    [total, setTotal] = useState(0),
    [selectedFund,setSelectedFund] = useState(0)

    //-> EFFECTS
    useEffect(() =>{
        const asyncGetWalletFunds = async() => {
            let 
            resBilleteraActual = (await _fetch(walletFundsURL+id_wallet)).data,
            urlBilleteraAnterior = `${lastWalletURL}${id_wallet}/${resBilleteraActual[0].ultima_actualizacion}`,
            resBilleteraAnterior = (await _fetch(urlBilleteraAnterior)).data,
            resHistorial = (await _fetch(`${historialURL}${id_wallet}/20`)),
            tot = 0
            setBilleteraAnterior(resBilleteraAnterior)
            resBilleteraActual.forEach((f) => tot += (f.cantidad * f.precio))
            setFondos(resBilleteraActual)
            setHistorial(resHistorial)
            setIsLoading(false)
            setTotal(tot)
        }

        asyncGetWalletFunds()
    },[id_wallet])

    
    
    //-> HANDLERS
    const MenuItemHandler = (ev,fund) =>{
        setSelectedFund(fund)
        console.log("MenuItemHandlre:",fund)
        document.querySelectorAll(".list-group-fund .list-group-item").forEach((el) => el.classList.remove("active") )
        ev.currentTarget.classList.add("active")
    }

    return (
        <Container>
            <h1 className="text-center mt-4 mb-5">Detalle de la billetera</h1>
            <Row>
                <Col>
                    <WalletTable fondos={fondos} isLoading={isLoading} total={total} billeteraAnterior={billeteraAnterior}/>
                </Col>
            </Row>
            <Row className="mt-5 mb-5">
                <Col xl="12" sm="12">
                    <h2 className="text-center mb-4">Rendimiento visual por fondo</h2>
                </Col>
                <Col>
                    <Graph selectedFund={selectedFund} historial={historial} total={total}/>
                </Col>
                <Col xl="3" lg="3" md="4">
                    <MenuGraph fondos={fondos} MenuItemHandler={MenuItemHandler} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <PerfomanceTable historial={historial}/>
                </Col>
            </Row>
        </Container>
    )
}