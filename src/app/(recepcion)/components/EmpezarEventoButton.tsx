'use client'

import React, {useEffect, useState} from "react";
import useModal from '@/hooks/useModal'
import useToggle from '@/hooks/useToggle'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Row, Spinner } from "react-bootstrap";
import { useFormik } from 'formik';
import { useQuery, gql, useMutation } from '@apollo/client';
import Select from "react-select";

// ************** Gql ***********

const GET_ESTACIONES_DISPONIBLES = gql`
    query EstacionesDisponibles {
        estacionesDisponibles {
            id
            numero
            empleado {
                id
                nombre
            }
        }
    }
`;

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


// ************** Helpers ***********

const getSelectEstacionOptions = (estaciones: any[]) => estaciones.map(
    (estacion)=>({
        value: estacion.id,
        label: estacion.numero
    })
);

const getSelectEmpleadoOptions = (estaciones: any[]) => estaciones.map(
    (estacion)=> {
        let empleado = estacion.empleado;
        return {
            value: empleado.id,
            label: empleado.nombre
        }
    }
)



const EmpezarEventoButton = (props: {
    estacionId?: string,
    empleado?: {
        id: string,
        nombre: string
    },
    numero?: number,
    onSubmit: Function
}) => {

    const {isOpen, className, scroll, size, toggleModal, openModalWithSize} = useModal();

    const {data: estacionesData, loading: loadingEstaciones, error: errorEstaciones} = useQuery(GET_ESTACIONES_DISPONIBLES);
    const [createFactura, {loading: loadingFactura, error: errorFactura, data: facturaData}] = useMutation(CREATE_FACTURA);

    const [estacionOptions, setEstacionOptions] = useState<any[]>([]);
    const [selectedEstacion, setSelectedEstacion] = useState<any>({});
    const [empleadoOptions, setEmpleadoOptions] = useState<any[]>([]);
    const [selectedEmpleado, setSelectedEmpleado] = useState<any>({});
    const [nombreCliente, setNombreCliente] = useState('');

    const disableButton = nombreCliente === '' || loadingEstaciones || loadingFactura;

    useEffect(()=>{
        if(estacionesData) {
            const estacionesDisponibles = estacionesData.estacionesDisponibles;
            setEstacionOptions(getSelectEstacionOptions(estacionesDisponibles));
            setSelectedEstacion({value: props.estacionId, label: props.numero})
            setEmpleadoOptions(getSelectEmpleadoOptions(estacionesDisponibles));
            setSelectedEmpleado({value: props.empleado?.id, label: props.empleado?.nombre});
        }
    }, [estacionesData]);

    function resetState() {
        setNombreCliente('');
        setSelectedEmpleado({value: props.empleado?.id, label: props.empleado?.nombre});
        setSelectedEstacion({value: props.estacionId, label: props.numero});
    }

    function crearFactura() {
        createFactura({
            variables: {
                createFacturaInput: {
                    evento: {
                        estacionId: selectedEstacion.value,
                        nombreCliente: nombreCliente
                    }
                }
            }
        });
    }

    function handleSubmit() {
        crearFactura();
        props.onSubmit();
        closeModal();
    }

    function closeModal() {
        resetState();
        toggleModal();
    }
 
    return (
        <>
            <button 
                type="button" 
                className="btn btn-ghost-primary"
                onClick={() => openModalWithSize('lg')}
            >
                Empezar evento
            </button>
    
            <Modal className="fade" show={isOpen} onHide={closeModal} dialogClassName={className} size={size} scrollable={scroll}>
                <ModalHeader onHide={closeModal} closeButton>
                    <h4 className="modal-title">Empezar servicio para cliente</h4>
                </ModalHeader>
                <ModalBody>
                    {
                        loadingEstaciones?
                            <div className="d-flex justify-content-center">
                                <Spinner />
                            </div>:
                            <form className="form-horizontal">
                                <Row className="mb-3">
                                    <Col md={6}>
                                        Número de estación
                                    </Col>
                                    <Col xs={6}>
                                        <Select
                                            defaultValue={selectedEstacion}
                                            placeholder={'Estacion'}
                                            options={estacionOptions}
                                            onChange={setSelectedEstacion}
                                        />    
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        Nombre del barbero
                                    </Col>
                                    <Col xs={6}>
                                        <Select
                                            defaultValue={selectedEmpleado}
                                            placeholder={'Barbero'}
                                            options={empleadoOptions}
                                            onChange={setSelectedEmpleado}
                                        />       
                                    </Col>
                                </Row>
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
                    }
                                    
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
                            loadingFactura ? 
                            <Spinner className="fs-10"/>:
                            "Empezar"
                        }
                        
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default EmpezarEventoButton;