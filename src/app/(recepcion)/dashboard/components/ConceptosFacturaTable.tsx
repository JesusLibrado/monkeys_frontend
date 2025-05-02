'use client'

import React, { useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

// ************** HELPERS ***************

import {conceptosFacturaMockInput, productosMockInput, serviciosMockInput} from '../data';
import ChoicesFormInput from '@/components/forms/ChoicesFormInput';

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

const getTotal = (concepto: any) => {
    if(Object.keys(concepto.servicio).length > 1)
        return concepto.servicio.precio * concepto.cantidad
    if(Object.keys(concepto.producto).length > 1)
        return concepto.producto.precioPublico * concepto.cantidad
    return 0;
}

const getPrecio = (concepto: any) => {
    if(concepto.servicio)
        return concepto.servicio.precio
    if(concepto.producto)
        return concepto.producto.precioPublico
    else return 0;
}; 

// ************** AgregarConceptoFacturaForm ***************

const AgregarConceptoFacturaForm = (props: { addConceptoFactura: any }) => {

    const [serviciosData, setServicios] = React.useState(serviciosByCategoria);
    const [productosData, setProductos] = React.useState(productosMockInput);

    const [precio, setPrecio] = React.useState(0);
    const disabledSubmitButton = () => getTotal(selectedConcepto) < 1 || selectedConcepto.cantidad < 1

    const [selectedConcepto, setSelectedConcepto ] = React.useState({
        servicio: {},
        producto: {},
        cantidad: 1,
        total: 0
    });

    function handleSelectedConceptoChange(conceptoId: any) {
        let selected = findServicioOrProducto(conceptoId);
        setPrecio(getPrecio(selected));
        let newConcepto = {
            servicio: selected.servicio?selected.servicio:{},
            producto: selected.producto?selected.producto:{},
            cantidad: selectedConcepto.cantidad,
            total: 0
        }
        setSelectedConcepto({
            ...newConcepto,
            total: getTotal(newConcepto)
        });
    }

    function handleCantidadConceptoChange(e: any) {
        e.preventDefault();
        let newConcepto = {
            ...selectedConcepto,
            cantidad: +e.target.value
        }
        setSelectedConcepto({
            ...newConcepto,
            total: getTotal(newConcepto)
        });
    }

    function handleSubmit() {
        props.addConceptoFactura(selectedConcepto);
        setSelectedConcepto({
            servicio: {},
            producto: {},
            cantidad: 1,
            total: 0
        });
    }

    return (
        <tr key='add-concepto-factura-row'> 
            <th scope="row"></th>
            <td className='text-start'>
                <div>
                    <ChoicesFormInput
                        className="form-select" 
                        id="choices-single-groups" 
                        data-choices data-choices-groups 
                        data-placeholder="Selecciona un producto o servicio"
                        onChange={handleSelectedConceptoChange}
                    >
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
            </td>
            <td>
                <input
                    className="form-control"
                    type="number" 
                    name="cantidad"
                    min="0"
                    onChange={handleCantidadConceptoChange}
                    defaultValue={selectedConcepto.cantidad}
                />
            </td>
            <td>
                ${precio}
            </td>
            <td className='text-end'>
                ${selectedConcepto.total}            
            </td>
            <td className='text-end'>
                <button 
                    className={`btn btn-ghost-primary rounded-pill btn-icon`}
                    type="submit"
                    disabled={disabledSubmitButton()}
                    onClick={handleSubmit}
                >
                    <IconifyIcon icon="ri:add-line" className="fs-15" /> 
                </button>
            </td>
        </tr>
    );
}

const ConceptosFacturaTable = (props: {
    facturaId: string
}) => {

    const [conceptosFacturaData, setConceptosFactura] = React.useState(
        conceptosFacturaMockInput.filter((cf)=>cf.facturaId == props.facturaId).map(cp=>cp.conceptosFactura)[0]
    );

    function addConceptoFactura(newCF: any) {
        setConceptosFactura([...conceptosFacturaData, newCF])
    }

    function removeConceptoFactura(conceptoId: string) {
        setConceptosFactura(conceptosFacturaData.filter((cf)=>cf.id!=conceptoId));
    }

    const getTotalFactura = ()=> (conceptosFacturaData||[]).reduce((acc, current)=>{return current.total+acc}, 0)

    return (
        <div>
            <div className={'table-response-sm'}>
                <table className="table text-center table-nowrap align-middle mb-0 table-sm">
                    <thead>
                    <tr className="bg-light bg-opacity-50">
                        <th className="border-0" scope="col" style={{ width: 50 }}>#</th>
                        <th className="text-start border-0" scope="col">Concepto</th>
                        <th className="border-0" scope="col" style={{ width: 50 }}>Cantidad</th>
                        <th className="border-0" scope="col" >Precio</th>
                        <th className="text-end border-0" scope="col">Total</th>
                        <th className="text-end border-0" scope="col"></th>
                    </tr>
                    </thead>
                    <tbody id="products-list">
                        <AgregarConceptoFacturaForm addConceptoFactura={addConceptoFactura}/>
                        {
                            (conceptosFacturaData||[]).map((concepto, idx) => {
                                let titulo, precio;
                                if(!concepto.producto || Object.keys(concepto.producto).length < 1){
                                    titulo = `${concepto.servicio?.categoria} ${concepto.servicio?.nombre}`
                                    precio = concepto.servicio?.precio
                                } else {
                                    titulo = `${concepto.producto?.nombre} ${concepto.producto?.marca}`
                                    precio = concepto.producto.precioPublico;
                                }

                                return (
                                    <tr key={concepto.id}>
                                        <th scope="row">0{idx + 1}</th>
                                        <td className="text-start">
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="fw-medium">{titulo}</span>
                                            </div>
                                        </td>
                                        <td>{concepto.cantidad}</td>
                                        <td>${precio}</td>
                                        <td className="text-end">${concepto.total}</td>
                                        <td className="text-end">
                                            <button 
                                                type="button" 
                                                className="btn flex-shrink-0 rounded-circle btn-icon btn-ghost-danger"
                                                onClick={(e)=>removeConceptoFactura(concepto.id)}
                                            >
                                                <IconifyIcon icon="solar:trash-bin-trash-bold-duotone" className="fs-20" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <table className="table table-nowrap align-middle mb-0 ms-auto" style={{ width: 335 }}>
                    <tbody>
                        <tr className="border-top border-top-dashed fs-16">
                            <td className="fw-bold">Total a pagar</td>
                            <td className="fw-bold text-end">${getTotalFactura()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ConceptosFacturaTable;