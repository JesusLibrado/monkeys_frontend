'use client'

import React, {useContext, useEffect, useState} from "react";
import useModal from '@/hooks/useModal'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Row, Spinner } from "react-bootstrap";
import { gql, useMutation } from '@apollo/client';
import SelectEstacion from "./SelectEstacion";
import { useEventoContext } from "@/context/useEventoContext";

// ************** GraphQL queries ***********

const CREATE_FACTURA = gql`
    mutation CreateFactura($createFacturaInput: CreateFacturaInput!) {
        createFactura(createFacturaInput: $createFacturaInput) {
            id
            estatus
            folio
            evento {
                id
                nombreCliente
            }
            createdAt
            updatedAt
        }
    }
`;


// ************** Exported component --- EmpezarEventoButton ***********

const EmpezarEventoButton = (props: {
    estacionId?: string,
    empleado?: {
        id: string,
        nombre: string
    },
    numero?: number,
    label?: String,
    className?: String
}) => {

    const [createFactura, {loading, error, data}] = useMutation(CREATE_FACTURA);

    const {isOpen, className, scroll, size, toggleModal, openModalWithSize} = useModal();
    const eventoContext = useEventoContext();

    const [nombreCliente, setNombreCliente] = useState('');
    const [selectedEstacionId, setSelectedEstacionId] = useState(props.estacionId);

    const disableButton = nombreCliente === '' || loading || selectedEstacionId == '';

    function handleEstacionChange(estacionId: string) {
        setSelectedEstacionId(estacionId);
    }

    function resetState() {
        setNombreCliente('');
        setSelectedEstacionId('');
    }

    function handleSubmit() {
        createFactura({
            variables: {
                createFacturaInput: {
                    evento: {
                        estacionId: selectedEstacionId,
                        nombreCliente: nombreCliente
                    }
                }
            }
        });
        closeModal();
        eventoContext.notifyEventoUpdated(true);
    }

    function closeModal() {
        resetState();
        toggleModal();
    }
 
    return (
        <>
            <button 
                type="button" 
                className={`btn ${props.className??'btn-primary'}`}
                onClick={() => openModalWithSize('lg')}
            >
                {props.label?props.label:"Comenzar evento"}
            </button>
    
            <Modal className="fade" show={isOpen} onHide={closeModal} dialogClassName={className} size={size} scrollable={scroll}>
                <ModalHeader onHide={closeModal} closeButton>
                    <h4 className="modal-title">Empezar servicio para cliente</h4>
                </ModalHeader>
                <ModalBody>
                    <form className="form-horizontal">
                        <SelectEstacion
                            estacionId={props.estacionId}
                            onChange={handleEstacionChange}
                        />
                        <Row className="mb-3">
                            <Col md={6}>
                                Nombre del cliente
                            </Col>
                            <Col xs={6}>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Juan Javier"
                                    onChange={(e)=>setNombreCliente(e.target.value)} 
                                />
                            </Col>
                        </Row>
                    </form>      
                </ModalBody>
                <ModalFooter>
                    <button 
                        type="button" 
                        className="btn btn-outline-danger"
                        onClick={closeModal}
                    >
                        Cancelar
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={disableButton}
                    >
                        {
                            loading ? 
                            <Spinner className="fs-10"/>:
                            "Aceptar"
                        }
                        
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default EmpezarEventoButton;