'use client'

import { useState, useEffect } from "react";
import useModal from '@/hooks/useModal'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Row, Spinner } from "react-bootstrap";
import { gql, useMutation } from '@apollo/client';
import IconifyIcon from "@/wrappers/IconifyIcon";
import { useRecepcionContext } from "@/context/useRecepcionContext";

// ************** GraphQL queries ***********

const CANCEL_FACTURA = gql`
    mutation CancelFactura($cancelFacturaId: String!) {
        cancelFactura(id: $cancelFacturaId) {
            id
            estatus
            createdAt
            updatedAt
        }
    }
`;


// ************** Exported component --- CancelarFacturaButton ***********

const CancelarFacturaButton = (props: {
    facturaId: string,
}) => {
    
    const [cancelarFactura, {data, loading, error}] = useMutation(CANCEL_FACTURA);

    const {isOpen, className, toggleModal, openModalWithClass} = useModal();
    const eventoContext = useRecepcionContext();

    const [facturaData, setFacturaData] = useState<any>({});

    useEffect(()=>{
        if(data) {
            const cancelFactura = data.cancelFactura;
            setFacturaData(cancelFactura);
        }
    }, [data]);
    
    function handleSubmit() {
        cancelarFactura({
            variables: {
                cancelFacturaId: props.facturaId
            }
        });
        toggleModal();
        eventoContext.notifyEventoUpdated(true);
    }

    return (
        <>
            <button 
                type='button' 
                className="btn btn-outline-danger"
                onClick={() => openModalWithClass('modal-dialog-centered')}
            >
                Cancelar evento
            </button>


            <Modal className="fade" dialogClassName={className} show={isOpen} onHide={toggleModal} size="sm">
                <div className={`modal-filled bg-danger`}>
                    <ModalBody className="p-4">
                        <div className="text-center">
                            <IconifyIcon icon="ri:information-line" className="h1" />
                            <h4 className="mt-2">¿Cancelar factura?</h4>
                            <p className="mt-3">
                                Al continuar, ya no podrás realizar el cobro de productos o servicios.
                                <br />
                                <br />
                                Click en Aceptar para continuar, de lo contrario da click fuera del recuadro.
                            </p>
                            <Button variant="light" className="my-2" onClick={handleSubmit}>
                                {
                                    loading ? 
                                        <Spinner className="fs-10"/>:
                                        'Aceptar'
                                }
                            </Button>
                        </div>
                    </ModalBody>
                </div>
            </Modal>
        </>

    )
}

export default CancelarFacturaButton;