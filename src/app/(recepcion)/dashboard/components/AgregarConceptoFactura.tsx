import React, { CSSProperties, useEffect } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Select from 'react-select';
import { useQuery, gql } from '@apollo/client';
import { productData } from '@/assets/data/Product';
import { Spinner } from 'react-bootstrap';
import { toNameCase } from '@/helpers/strings';


// ************** Gql queries ***********

const GET_AVAILABLE_PRODUCTOS = gql`
    query AvailableProductos {
        availableProductos {
            id
            nombre
            marca
            cantidadDisponible
            precioPublico
        }
    }
`

const GET_AVAILABLE_SERVICIOS = gql`
    query Servicios {
        servicios {
            id
            nombre
            categoria
            precio
        }
    }
`

// *********************** Helpers ***************

const serviciosByCategoria = (servicios: any[]) => servicios.reduce((serviciosByCategoria, currentValue)=>{
    let categoria = currentValue.categoria;
    if(serviciosByCategoria.has(categoria)){
        let currentAccumulated = serviciosByCategoria.get(categoria);
        serviciosByCategoria.set(categoria, [...currentAccumulated, currentValue]);
    } else  {
        serviciosByCategoria.set(categoria, [currentValue]);
    }

    return serviciosByCategoria;
}, new Map());

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

const getSelectOptions = (serviciosByCategoria: any[], productos: any[]) => {
    let serviciosGrouped = [...serviciosByCategoria].map(
        ([categoriaServicio, servicios])=>({
            label: categoriaServicio,
            options: servicios.map((servicio: any)=>({
                    value: servicio.id,
                    label: `${toNameCase(servicio.nombre)}`
                })
            )
        })
    );
    let productosGrouped = {
        label: 'PRODUCTOS',
        options: productos.map(producto=>({
            value: producto.id,
            label: `${toNameCase(producto.nombre)} ${producto.marca}`
        }))
    }
    return [...serviciosGrouped, productosGrouped];
}


const formatGroupLabel = (data: {label: string, options: any[]}) => (
    <div className='d-flex justify-content-between align-items-center mb-1'>
        <span>{data.label}</span>
    </div>
);

// *********************** AgregarConceptoFactura ***************

const AgregarConceptoFactura = (props: { addConceptoFactura: any }) => {

    let {loading: loadingProductos , error: errorProductos, data: productosData} = useQuery(GET_AVAILABLE_PRODUCTOS);
    const [productos, setProductos] = React.useState<any[]>([]);

    let {loading: loadingServicios , error: errorServicios, data: serviciosData} = useQuery(GET_AVAILABLE_SERVICIOS);
    const [servicios, setServicios] = React.useState<any[]>([]);

    const [selectOptions, setSelectOptions] = React.useState<any[]>([]);
    const [precio, setPrecio] = React.useState(0);
    const [cantidadDisponible, setcantidadDisponible] = React.useState(0);
    const disabledSubmitButton = () => 
        getTotal(selectedConcepto) < 1 || 
        selectedConcepto.cantidad < 1 || 
        selectedConcepto.cantidad > cantidadDisponible

    const [selectedConcepto, setSelectedConcepto ] = React.useState({
        servicio: {},
        producto: {},
        cantidad: 1,
        total: 0
    });

    useEffect(()=>{
        let productos: any[] = []; 
        let servicios: any[] = [];

        if(productosData) {
            productos = productosData.availableProductos;
            setProductos(productos);
        }
        if(serviciosData) {
            servicios = serviciosData.servicios;
            setServicios(servicios);
            servicios = serviciosByCategoria(serviciosData.servicios);
        }
        if(serviciosData || productosData){
            setSelectOptions(getSelectOptions(servicios, productos));
            
        }

    },[productosData, serviciosData]);


    function findServicioOrProducto(conceptoId: string) {
        let servicio = servicios.find((servicio)=>servicio.id == conceptoId);
        let producto = productos.find((producto)=>producto.id == conceptoId);
        if(servicio) return {servicio: servicio};
        return {producto: producto};
    }

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
        if(selected.producto && Object.keys(selected.producto).length>1){
            setcantidadDisponible(selected.producto.cantidadDisponible);
        } else {
            setcantidadDisponible(1000);
        }
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
                    {
                        (loadingProductos || loadingServicios)?
                            <Spinner />:
                            <Select
                                defaultValue={''}
                                formatGroupLabel={formatGroupLabel}
                                onChange={handleSelectedConceptoChange}
                                options={selectOptions}
                            />
                    }
                </div>
            </td>
            <td>
                <input
                    className={`form-control`}
                    type="number" 
                    name="cantidad"
                    min="0"
                    max={cantidadDisponible}
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