import ComponentContainerCard from "@/components/base-ui/ComponentContainerCard";
import MetodoPagoSelector from "@/components/MetodoPagoSelector";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { COMISION_PAGO_CON_TARJETA } from "@/types/pago";

const PagoForm = (props: {
    facturaId: string,
    total: number
}) => {

    const {total, facturaId} = props;
    const [selectedMetodoPago, setSelectedMetodoPago] = useState("");
    const [montoRecibido, setMontoRecibido] = useState(0);

    const montoPorCobrar = selectedMetodoPago.includes("TARJETA")?total+((total*COMISION_PAGO_CON_TARJETA)/100):total;

    return (
        <ComponentContainerCard title={"Información de pago"}>
            <Row>
                <Col xs={12} sm={12} md={8} xl={12} xxl={12}>
                    <MetodoPagoSelector onMetodoPagoChange={setSelectedMetodoPago}/>
                </Col>
                <Col xs={12} sm={12} md={8} xl={12} xxl={12}>
                    <table className="table table-nowrap align-middle" >
                        <tbody>
                            {
                                 selectedMetodoPago.includes("TARJETA") && (
                                    <tr>
                                        <td className="fw-medium">Comisión pago con tarjeta</td>
                                        <td className="text-end">{COMISION_PAGO_CON_TARJETA} %</td>
                                    </tr>
                                 )
                            }
                            <tr className="fs-16">
                                <td className="fw-bold">Monto por cobrar</td>
                                <td className="fw-bold text-end">${montoPorCobrar}</td>
                            </tr>
                            {
                                selectedMetodoPago==="EFECTIVO" && (
                                    <>
                                        <tr>
                                            <td className="fw-medium">Monto recibido</td>
                                            <td className="input-group flex-nowrap">
                                                <span className="input-group-text">$</span>
                                                <input type="number" 
                                                    style={{width: 50}}
                                                    className="form-control"
                                                    onChange={(e)=>setMontoRecibido(Number(e.target.value))}
                                                    placeholder={`${total}`}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Cambio</td>
                                            <td className="text-end">${montoRecibido>total?montoRecibido-total:0}</td>
                                        </tr>
                                        {/* is this REALLY NEEDED */}
                                        {/* <tr>
                                            <td className="fw-medium">Monto devuelto</td>
                                            <td className="input-group flex-nowrap">
                                                <span className="input-group-text">$</span>
                                                <input type="number" 
                                                    style={{width: 50}}
                                                    className="form-control"
                                                    onChange={(e)=>setMontoDevuelto(Number(e.target.value))}
                                                    placeholder={`${montoRecibido-total??0}`}
                                                />
                                            </td>
                                        </tr> */}
                                    </>
                                )
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
            <div className="mt-4 text-end">
                <Button variant="primary" type="submit" className="px-4">
                    Registrar pago
                </Button>
                
            </div>
        </ComponentContainerCard>
    );
}

export default PagoForm;