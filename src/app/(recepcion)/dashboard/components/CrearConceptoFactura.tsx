'use client'

import React, { useEffect } from 'react';
import { Card, CardBody, Col, Row, ListGroup as BSListGroup, ListGroupItem } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Formik } from 'formik';
import Select from 'react-select';

const CrearConceptoFactura = (props: {
    facturaId: string,
    onCloseClicked: any
}) => {

    const FormularioConceptoFactura = () => (
        <Formik
            initialValues={{
                cantidad: 1,
                precio: 0,
                nombre: '',
                categoria: 'GRECA'
            }}
            onSubmit={(values, {setSubmitting})=> {
                alert(JSON.stringify(values));
                setSubmitting(false);
            }}
        >
            {
                ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                })=>(
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={3}>
                                <div className="mb-3">
                                    <label className="form-label">Categoría</label>
                                    <Select
                                        onChange={(selected)=>setFieldValue('categoria', selected?.value)}
                                        options={[
                                            {
                                                value: 'GRECA',
                                                label: 'greca'
                                            },
                                            {
                                                value: 'OTRO',
                                                label: 'otro'
                                            },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="mb-3">
                                    <label htmlFor="input-nombre" className="form-label">Nombre</label>
                                    <input 
                                        className="form-control" 
                                        id="input-nombre" 
                                        type="text" name="nombre"
                                        onChange={handleChange}
                                        value={values.nombre}
                                        placeholder='Cotizacion greca Juan'
                                    />
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="mb-3">
                                    <label htmlFor="input-precio" className="form-label">Precio</label>
                                    <input 
                                        className="form-control" 
                                        id="input-precio" 
                                        type="number" name="precio" min="1" 
                                        onChange={handleChange}
                                        value={values.precio}
                                    />
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="mb-3">
                                    <label htmlFor="input-cantidad" className="form-label">Cantidad</label>
                                    <input 
                                        className="form-control" 
                                        id="input-cantidad" 
                                        type="number" name="cantidad" min="1" 
                                        onChange={handleChange}
                                        value={values.cantidad}
                                    />
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="mt-1">
                                    <br />
                                    <button 
                                        className={`btn btn-outline-primary ${''}`}
                                        type="submit" disabled={isSubmitting || values.cantidad < 1 || values.nombre == '' || values.precio < 1}
                                    >
                                        <IconifyIcon icon="ri:add-line" className="fs-15" /> agregar
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </form>
                )
            }
        </Formik>
    );
    
    return (
        <Card>
            <CardBody>
                <div className="d-flex align-items-start justify-content-between">
                    <h5>Cotizar greca o crear otro tipo de servicio</h5>
                    <div className='text-end'>
                        <button 
                            type="button" 
                            className="btn flex-shrink-0 rounded-circle btn-icon btn-ghost-danger"
                            onClick={props.onCloseClicked}
                        >
                            <IconifyIcon icon="solar:close-circle-outline" className="fs-20" />
                        </button>
                    </div>
                </div>
                <FormularioConceptoFactura />
            </CardBody>
        </Card>
    );
}

export default CrearConceptoFactura;