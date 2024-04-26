import { useState, useEffect } from "react";
import { Container,Row,Col, Card } from "react-bootstrap";
import { DetailWalletFooter } from './DetailWalletFooter';
import { _fetch } from '../../helper/httpClient';

export function WalletsList(){
    
    //-> VARIABLES
    const walletsEndpoint = 'wallet',
    
    //-> STATES
    [walletList, setWalletList] = useState([]),
    [isLoading, setIsLoading] = useState(true);
    
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

    return (
        <Container>
            <Row>
                <h1 className="text-center mt-3 mb-5">Billeteras</h1>
                {!isLoading && walletList.map((wallet) => (
                    <Col key={`col-wallet-${wallet.id}`}>
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
    )
}