import React, { CSSProperties, useEffect } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SelectConcepto from './SelectConcepto';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Spinner } from 'react-bootstrap';

// *********************** Gql mutations ***************

const CREATE_CONCEPTO_FACTURA = gql`
    mutation CreateConceptoFactura($createConceptoFacturaInput: CreateConceptoFacturaInput!) {
        createConceptoFactura(createConceptoFacturaInput: $createConceptoFacturaInput) {
            id
            cantidad
            total
            producto {
                id
                nombre
                marca
                precioPublico
            }
            servicio {
                id
                nombre
                categoria
                precio
            }
        }
    }
`;


// *********************** AgregarConceptoFactura ***************

const AgregarConceptoFactura = (props: { 
    facturaId: string,
    addConceptoFactura: any 
}) => {

    const [createConceptoFactura, {loading, error, data}] = useMutation(CREATE_CONCEPTO_FACTURA);

    const [selectedConcepto, setSelectedConcepto ] = React.useState({
            servicioId: '',
            productoId: ''
        });
    const [precio, setPrecio] = React.useState(0);
    const [cantidad, setCantidad] = React.useState(1);
    const [cantidadDisponible, setCantidadDisponible] = React.useState(1);
    
    useEffect(()=>{
        if(data) {
            props.addConceptoFactura(data.createConceptoFactura);
        }
    }, [data]);

    const total = precio * cantidad;

    const disabledSubmitButton = 
        total < 1 || 
        cantidad < 1 || 
        cantidad > cantidadDisponible

    function handleSelectedConceptoChange(newConcepto: any) {
        setCantidadDisponible(newConcepto.cantidadDisponible);
        setPrecio(newConcepto.precio);
        setSelectedConcepto({
            servicioId: newConcepto.servicio?newConcepto.servicio.id:'',
            productoId: newConcepto.producto?newConcepto.producto.id:''
        });
    }

    function handleCantidadConceptoChange(e: any) {
        e.preventDefault();
        setCantidad(+e.target.value);
    }

    function handleSubmit() {
        createConceptoFactura({
            variables: {
                createConceptoFacturaInput: {
                    facturaId: props.facturaId,
                    cantidad: cantidad,
                    servicioId: selectedConcepto.servicioId!=''?selectedConcepto.servicioId:'',
                    productoId: selectedConcepto.productoId!=''?selectedConcepto.productoId:''
                }
            }
        });
        setSelectedConcepto({
            servicioId: '',
            productoId: ''
        });
        setPrecio(0);
        setCantidad(1);
    }

    return (
        <tr key='add-concepto-factura-row'> 
            <th scope="row"></th>
            <td className='text-start'>
                <div>
                    <SelectConcepto onSelectedConceptoChange={handleSelectedConceptoChange}  />
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
                    defaultValue={cantidad}
                />
            </td>
            <td>
                ${precio}
            </td>
            <td className='text-end'>
                ${total}            
            </td>
            <td className='text-end'>
                <button 
                    className={`btn ${disabledSubmitButton?'btn-light':'btn-primary'} rounded-pill btn-icon`}
                    type="submit"
                    disabled={disabledSubmitButton}
                    onClick={handleSubmit}
                >
                    {
                        (loading)?
                            <Spinner />:
                            <IconifyIcon icon="ri:add-line" className="fs-15" /> 
                    }
                </button>
            </td>
        </tr>
    );
}

export default AgregarConceptoFactura;