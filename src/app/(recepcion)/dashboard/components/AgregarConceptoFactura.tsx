import React, { CSSProperties } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import ChoicesFormInput from '@/components/forms/ChoicesFormInput';

// ************** HELPERS ***************
import {productosMockInput, serviciosMockInput} from '../data';
import Select from 'react-select';


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

const getSelectOptions = () => {
    let serviciosGrouped = [...serviciosByCategoria].map(
        ([categoriaServicio, servicios])=>({
            label: categoriaServicio,
            options: servicios.map((servicio: any)=>({
                    value: servicio.id,
                    label: `${servicio.nombre}`
                })
            )
        })
    );
    let productosGrouped = {
        label: 'PRODUCTOS',
        options: productosMockInput.map(producto=>({
            value: producto.id,
            label: `${producto.nombre} ${producto.marca}`
        }))
    }
    return [...serviciosGrouped, productosGrouped];
}


const formatGroupLabel = (data: {label: string, options: any[]}) => (
    <div className='d-flex justify-content-between align-items-center mb-1'>
        <span>{data.label}</span>
    </div>
);

const AgregarConceptoFactura = (props: { addConceptoFactura: any }) => {

    const [selectOptions, setSelectOptions] = React.useState(getSelectOptions());

    const [precio, setPrecio] = React.useState(0);
    const disabledSubmitButton = () => getTotal(selectedConcepto) < 1 || selectedConcepto.cantidad < 1

    const [selectedConcepto, setSelectedConcepto ] = React.useState({
        servicio: {},
        producto: {},
        cantidad: 1,
        total: 0
    });

    function handleSelectedConceptoChange(concepto: any) {
        let selected = findServicioOrProducto(concepto.value);
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
                    <Select
                        defaultValue={''}
                        formatGroupLabel={formatGroupLabel}
                        onChange={handleSelectedConceptoChange}
                        options={selectOptions}
                    />
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
                    className={`btn ${disabledSubmitButton()?'btn-light':'btn-primary'} rounded-pill btn-icon`}
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

export default AgregarConceptoFactura;