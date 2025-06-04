import { timeSince } from "@/utils/date";
import { Row, Col } from "react-bootstrap"

const FacturaInfo = (props: {
    nombreCliente: string,
    nombreEmpleado: string,
    horaCreacion: string,
    horaActualizacion: string
}) => {

    return (
        <Row>
            <Col md={5}>
                <div className='mb-4'>
                    <h5 className="fw-bold mb-2 fs-14"> Nombre del cliente: </h5>
                    <h6 className="fs-14 mb-2">{props.nombreCliente}</h6>
                </div>
                <div>
                    <h5 className="fw-bold mb-2 fs-14"> Fecha de creación: </h5>
                    <h6 className="fs-14 mb-2">{props.horaCreacion}</h6>
                </div>
            </Col>
            <Col md={5}>
                <div className='mb-4'>
                    <h5 className="fw-bold mb-2 fs-14"> Atendido por: </h5>
                    <h6 className="fs-14 mb-2">{props.nombreEmpleado}</h6>
                </div>
                <div>
                    <h5 className="fw-bold mb-2 fs-14"> Última actualización: </h5>
                    <h6 className="fs-14 mb-2">{props.horaActualizacion}</h6>
                </div>
            </Col>
        </Row>
    );
}

export default FacturaInfo;