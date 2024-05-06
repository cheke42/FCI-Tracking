import { useState } from 'react';
import { Container,Row,Col, Button,Form,Badge } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import { _fetch } from '../../helper/httpClient';
 
export function ModalAddWallet({show,setShowModal,updateWallets}){

    //-> VARIABLES
    const saveWalletEndpoint = 'wallet/save'

    //-> STATES
    const 
    [walletName, setWalletName] = useState(''),
    [showError, setShowError] = useState(false);

    //-> HANDLER
    const handlerSave = async(ev) =>{
        const response = await _fetch(saveWalletEndpoint,'POST',{wallet_name: walletName})
        if(response.status === 'error'){
            setShowError(true)
        }else{
            setShowError(false)
            setShowModal(false)
            updateWallets()
        }
    }


    

    return (
        <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar billetera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control value={walletName} onChange={ev => setWalletName(ev.target.value)}/>
                            </Form.Group>
                        </Form>
                        <div className='text-center mb-2 mt-1'>
                            {
                                showError && (<Badge bg="danger">La billetera ya existe</Badge>)
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ev => setShowModal(false)}>Cerrar</Button>
          <Button variant="primary" onClick={ev => handlerSave(ev)}><FaSave /> Guardar</Button>
        </Modal.Footer>
      </Modal>
    )
}