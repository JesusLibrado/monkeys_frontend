'use client'

import ChoicesFormInput from '@/components/forms/ChoicesFormInput';
import React, { useEffect } from 'react';
import { Card, CardBody, Col, Row, ListGroup as BSListGroup, ListGroupItem } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Formik } from 'formik';

import {productosMockInput, serviciosMockInput} from '../data';

const serviciosByCategoria = serviciosMockInput.reduce((serviciosByCategoria, currentValue)=>{
    let categoria = currentValue.categoria;
    if(serviciosByCategoria.has(categoria)){
        let currentAccumulated = serviciosByCategoria.get(categoria);
        serviciosByCategoria.set(categoria, [...currentAccumulated, currentValue]);
    } else  {
        serviciosByCategoria.set(categoria, [currentValue]);
    }

    return serviciosByCategoria;
}, new Map());

const findServicioOrProducto = (conceptoId: string) => {
    let servicio = serviciosMockInput.find((servicio)=>servicio.id == conceptoId);
    let producto = productosMockInput.find((producto)=>producto.id == conceptoId);
    if(servicio) return {servicio: servicio};
    return {producto: producto};
}

const AgregarConceptosFactura = (props: {
    facturaId: string,
    onCloseClicked: any
}) => {

    const [serviciosData, setServicios] = React.useState(serviciosByCategoria);
    const [productosData, setProductos] = React.useState(productosMockInput);

    const [crearNuevoServicio, setCrearNuevoServicio] = React.useState(false);

    const [newConceptosFactura, setNewConceptosFactura] = React.useState([{}]);

    const FormularioConceptoFactura = () => (
        <Formik
            initialValues={{
                conceptoId: '',
                cantidad: 1,
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    const concepto = findServicioOrProducto(values.conceptoId);
                    const total = (concepto.servicio?concepto.servicio.precio:concepto.producto?.precioPublico||1) * values.cantidad;
                    const newConceptoFactura = {
                        cantidad: values.cantidad,
                        total: total,
                        ...concepto
                    }
                    setNewConceptosFactura([...newConceptosFactura, newConceptoFactura]);
                    setSubmitting(false);
                }, 400);
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
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Concepto</label>
                                    <ChoicesFormInput 
                                        className="form-control" 
                                        id="choices-single-groups" 
                                        data-choices data-choices-groups 
                                        data-placeholder="Selecciona un producto o servicio"
                                        onChange={(value)=>{setFieldValue('conceptoId', value)}}
                                    >
                                        <option 
                                            onClick={()=>setCrearNuevoServicio(true)}
                                            value={'CREATE-NEW'}
                                        >Greca u otro servicio</option>
                                        {
                                            [...serviciosData].map(([categoriaServicio, servicios])=>(
                                                <optgroup label={categoriaServicio} key={categoriaServicio}>
                                                    {
                                                        servicios.map(
                                                            (servicio: any)=>(
                                                                <option value={servicio.id} key={servicio.id}>{servicio.nombre}</option>
                                                            )
                                                        )
                                                    }
                                                </optgroup>
                                            ))
                                        }
                                        <optgroup label={'PRODUCTOS'} key={'productos'}>
                                            {
                                                productosData.map((producto)=>(
                                                    <option value={producto.id} key={producto.id}>{producto.nombre} {producto.marca}</option>
                                                ))
                                            }
                                        </optgroup>
                                    </ChoicesFormInput>
                                </div>
                            </Col>
                            <Col md={3}>
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
                            <Col md={3}>
                                <div className="mt-1">
                                    <br />
                                    <button 
                                        className={`btn btn-outline-primary ${''}`}
                                        type="submit" disabled={isSubmitting || values.cantidad < 1 || values.conceptoId == ''}
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

    const NewConceptosFactura = () => (
        <BSListGroup>
            {
                newConceptosFactura.filter(cf=>Object.keys(cf).length>1).map((cf: any)=>(
                    <ListGroupItem>
                        {cf.servicio?cf.servicio?.nombre:cf.producto?.nombre} <IconifyIcon icon='solar:trash-circle-outline' className="me-1 align-middle fs-18" /> 
                    </ListGroupItem>
                ))
            }
      </BSListGroup>
    );

    return (
        <Card>
            <CardBody>
                <div className="d-flex align-items-start justify-content-between">
                    <h5>Agregar productos o servicios</h5>
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
                <NewConceptosFactura />
            </CardBody>
        </Card>
    );
}

export default AgregarConceptosFactura;