import { useState, useEffect } from "react";
import { Container,Row,Col, Card,Button } from "react-bootstrap";
import { DetailWalletFooter } from './DetailWalletFooter';
import { FaCirclePlus } from "react-icons/fa6";
import { _fetch } from '../../helper/httpClient';
import { ModalAddWallet } from "./ModalAddWallet";

export function WalletsList(){
    
    //-> VARIABLES
    const walletsEndpoint = 'wallet',
    
    //-> STATES
    [walletList, setWalletList] = useState([]),
    [isLoading, setIsLoading] = useState(true),
    [showAddModal,setShowAddModal] = useState(false);
    
    //-> EFFECTS
    useEffect(() => {
        asyncGetWalletsList()
    }, []);

    const asyncGetWalletsList = async() => {
        let 
        jsonResponse = (await _fetch(walletsEndpoint)).data
        setWalletList(jsonResponse)
        setIsLoading(false)
    }

    //-> HANDLER
    const 
    handlerNewWallet = () => {
        setShowAddModal(true)
    }

    return (
        <>
            <Container>
            <h1 className="text-center mt-3 mb-5">Billeteras</h1>
            <Row>
                <Col className="text-end">
                    <Button variant="dark" onClick={handlerNewWallet}><FaCirclePlus /> Nueva Billetera</Button>
                </Col>
            </Row>
            <Row>
                {!isLoading && walletList.map((wallet) => (
                    <Col xxl={4} xl={4} lg={6} md={12} key={`col-wallet-${wallet.id}`}>
                        <Card className="mt-2 bg-light" key={`wallet-${wallet.id}`}>
                            <Card.Body >
                                <Card.Title className="fs-1 text-center">{wallet.nombre}</Card.Title>
                                <Card.Subtitle  className="mb-2 text-muted text-center">Billetera N° {wallet.id}</Card.Subtitle>
                                <DetailWalletFooter key={'wallet-'+wallet.id} walletId={wallet.id}/>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </Container>
            <ModalAddWallet show={showAddModal} setShowModal={setShowAddModal} updateWallets={asyncGetWalletsList}/>
        </>

    )
}