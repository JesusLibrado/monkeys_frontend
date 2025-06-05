import { Spinner } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
import Select from 'react-select';
import React, { useEffect } from 'react';
import { toSentenceCase } from '@/utils/change-casing';


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
                    label: `${toSentenceCase(servicio.nombre)}`
                })
            )
        })
    );
    let productosGrouped = {
        label: 'PRODUCTOS',
        options: productos.map(producto=>({
            value: producto.id,
            label: `${toSentenceCase(producto.nombre)} ${producto.marca}`
        }))
    }
    return [...serviciosGrouped, productosGrouped];
}

const formatGroupLabel = (data: {label: string, options: any[]}) => (
    <div className='d-flex justify-content-between align-items-center mb-1'>
        <span>{data.label}</span>
    </div>
);

// *********************** SelectConcepto ***************

const SelectConcepto = (props: {
    onSelectedConceptoChange: Function
}) =>{

    let {loading: loadingProductos , error: errorProductos, data: productosData} = useQuery(GET_AVAILABLE_PRODUCTOS);
    const [productos, setProductos] = React.useState<any[]>([]);

    let {loading: loadingServicios , error: errorServicios, data: serviciosData} = useQuery(GET_AVAILABLE_SERVICIOS);
    const [servicios, setServicios] = React.useState<any[]>([]);

    const [selectOptions, setSelectOptions] = React.useState<any[]>([]);

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
        let newConcepto = {
            servicio: selected.servicio?selected.servicio:{},
            producto: selected.producto?selected.producto:{},
            cantidadDisponible: selected.producto?.cantidadDisponible,
            precio: getPrecio(selected)
        }
        props.onSelectedConceptoChange(newConcepto);
    }
    
    return (
        <div>
            {
                (loadingProductos || loadingServicios)?
                    <Spinner />:
                    <Select
                        defaultValue={''}
                        placeholder={'Producto o servicio'}
                        formatGroupLabel={formatGroupLabel}
                        onChange={handleSelectedConceptoChange}
                        options={selectOptions}
                    />
            }
        </div>
    )
}

export default SelectConcepto;